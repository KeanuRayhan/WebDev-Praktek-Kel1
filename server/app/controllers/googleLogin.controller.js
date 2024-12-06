const { OAuth2Client } = require('google-auth-library');
const db = require("../models");
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.config');
const User = db.user; // Model user Anda di database

// Konfigurasi Google OAuth2 Client
const clientId = process.env.GOOGLE_CLIENT_ID || "299239094407-147h2jlgcbg7057l0a6lk0flm8f7138t.apps.googleusercontent.com";
const client = new OAuth2Client(clientId);

exports.googleLogin = async (req, res) => {
    const { token } = req.body;

    try {
        // Verifikasi token dari Google
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: clientId,  // Pastikan ini sesuai dengan clientId di aplikasi Google Anda
        });
        const payload = ticket.getPayload();
        const googleId = payload['sub'];  // ID pengguna Google
        const email = payload['email'];

        // Cek apakah pengguna sudah ada di database berdasarkan Google ID
        let user = await User.findOne({ where: { google_id: googleId } });

        if (!user) {
            // Jika pengguna tidak ada, buat pengguna baru
            user = await User.create({
                username: email.split('@')[0], // Mengambil bagian depan dari email sebagai username
                email: email,
                google_id: googleId,
                role:'user',
            });
        }

        // Buat token akses aplikasi untuk pengguna
        const accessToken = generateAccessToken(user); // Fungsi untuk membuat token

        res.status(200).json({
            id: user.user_id,
            username: user.username,
            email: user.email,
            role: user.role,  // Mengembalikan role pengguna
            accessToken: accessToken
        });
    } catch (error) {
        console.error("Google login error: ", error);
        res.status(401).json({ message: "Invalid Google token" });
    }
};

// Fungsi untuk generate token akses
function generateAccessToken(user) {
    return jwt.sign(
        { id: user.user_id, email: user.email },
        authConfig.secret,
        { expiresIn: '1h' } // Sesuaikan waktu kadaluarsa sesuai kebutuhan
    );
};
