const db = require("../models");
const config = require("../config/auth.config");
const { OAuth2Client } = require('google-auth-library');
const User = db.user;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

// Fungsi signup
exports.signup = (req, res) => {
  // Menentukan role default sebagai 'USER'
  const userRole = req.body.role || 'user';

  // Save User to Database
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
    role: userRole,  // Menyimpan role ke database
    issuspended: false
  })
    .then(user => {
      res.send({ message: "User was registered successfully!" });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

// Fungsi signin
exports.signin = (req, res) => {
  console.log("Request body:", req.body); // Log request body
  User.findOne({
    where: {
      username: req.body.username
    }
  })
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      // Cek apakah akun pengguna disuspend
      if (user.issuspended) {
        return res.status(403).send({
          message: "Your account has been suspended. Please contact administrator."
        });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }

      const token = jwt.sign({ id: user.user_id, role: user.role }, config.secret, {
        expiresIn: 86400 // 24 hours
      });

      res.status(200).send({
        id: user.user_id,
        username: user.username,
        email: user.email,
        role: user.role,  // Mengembalikan role pengguna
        accessToken: token
      });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

const client = new OAuth2Client(config.googleClientId); // Ganti dengan ID klien Google Anda
// Fungsi googleLogin
exports.googleLogin = async (req, res) => {
  const { token } = req.body;

  try {
      // Verifikasi token dari Google
      const ticket = await client.verifyIdToken({
          idToken: token,
          audience: config.googleClientId,  // Ganti dengan Client ID Anda
      });
      const payload = ticket.getPayload();
      const userId = payload['sub'];  // ID pengguna Google
      const userEmail = payload['email'];

      // Cek apakah pengguna sudah ada di database
      let user = await User.findOne({ where: { email: userEmail } });

      if (!user) {
          // Jika pengguna tidak ada, buat pengguna baru
          user = await User.create({
              username: userEmail.split('@')[0], // Mengambil username dari email
              email: userEmail,
              password: bcrypt.hashSync(userId, 8), // Simpan ID Google sebagai password (tidak akan digunakan)
              role: 'user', // Menetapkan role default
              id: userId // Simpan Google ID
          });
      }

      // Buat token akses untuk pengguna
      const token = jwt.sign({ id: user.user_id, role: user.role }, config.secret, {
          expiresIn: 86400 // 24 hours
      });

      res.status(200).send({
          id: user.user_id,
          username: user.username,
          email: user.email,
          role: user.role,
          accessToken: token
      });
  } catch (error) {
      console.error("Google login error: ", error);
      res.status(401).send("Invalid token");
  }
};