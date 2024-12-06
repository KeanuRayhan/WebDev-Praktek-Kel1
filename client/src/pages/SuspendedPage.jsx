import React from 'react';
import { useLocation, Link } from 'react-router-dom';

const SuspendedPage = () => {
    const location = useLocation();
    const message = location.state?.message || "Akun Anda telah disuspend. Hubungi tim dukungan untuk informasi lebih lanjut.";

    return (
        <div className="bg-black flex items-center justify-center min-h-screen">
            <div className="bg-gray-800 p-8 rounded-lg shadow-md w-80 text-center">
                <h2 className="text-yellow-500 text-xl font-bold mb-6">Dramaku</h2>
                <p className="text-white mb-4">{message}</p>
                <p className="mt-4 text-center text-white text-sm">
                    <Link to="/login" className="text-yellow-500 hover:underline">
                        Kembali ke Halaman Login
                    </Link>
                </p>
                <p className="mt-4 text-center text-white text-sm">
                    <Link to="/" className="text-yellow-500 hover:underline">
                        Kembali ke Home
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default SuspendedPage;
