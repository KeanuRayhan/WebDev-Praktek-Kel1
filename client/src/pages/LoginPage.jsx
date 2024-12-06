import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import CheckButton from 'react-validation/build/button';
import { gapi } from 'gapi-script';

import AuthService from '../services/auth.service';

const clientId = "299239094407-147h2jlgcbg7057l0a6lk0flm8f7138t.apps.googleusercontent.com";

const required = (value) => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                This field is required!
            </div>
        );
    }
};

const LoginPage = () => {
    let navigate = useNavigate();

    const form = useRef();
    const checkBtn = useRef();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    // 
    useEffect(() => {
        function start() {
            gapi.client.init({
                clientId: clientId,
                scope: "profile email"
            });
        }

        gapi.load('client:auth2', start);
    }, []);

    const onChangeUsername = (e) => {
        const username = e.target.value;
        setUsername(username);
    };

    const onChangePassword = (e) => {
        const password = e.target.value;
        setPassword(password);
    };

    const handleLogin = (e) => {
        e.preventDefault();

        setMessage("");
        setLoading(true);

        form.current.validateAll();

        if (checkBtn.current.context._errors.length === 0) {
            AuthService.login(username, password).then(
                () => {
                    navigate("/");
                    window.location.reload();
                },
                (error) => {
                    const resMessage =
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString();

                    // Cek jika pesan menunjukkan bahwa akun disuspend
                    if (resMessage === "Your account has been suspended. Please contact administrator.") {
                        navigate("/suspended", {
                            state: { message: "Your account has been suspended. Please contact our administrator." },
                        });
                    } else {
                        setMessage(resMessage);
                    }

                    setLoading(false);
                }
            );
        } else {
            setLoading(false);
        }
    };

    const handleGoogleLogin = () => {
        const auth2 = gapi.auth2.getAuthInstance();
        auth2.signIn().then((response) => {
            console.log("Google login success: ", response);
            const id_token = response.getAuthResponse().id_token;

            // Kirim hanya id_token ke backend untuk login
            AuthService.googleLogin(id_token)
                .then(() => {
                    navigate("/");
                    window.location.reload();
                })
                .catch((error) => {
                    console.error("Google login failed: ", error);
                    setMessage("Google login failed. Please try again.");
                });
        }).catch((error) => {
            console.error("Google login error: ", error);
            setMessage("Login failed. Please try again.");
        });
    };

    return (
        <div className="bg-black flex items-center justify-center min-h-screen">
            <div className="bg-gray-800 p-8 rounded-lg shadow-md w-80">
                <h2 className="text-center text-yellow-500 text-xl font-bold mb-6">Dramaku</h2>
                <Form onSubmit={handleLogin} ref={form}>
                    <div className="mb-4">
                        <label htmlFor="username" className="block text-white mb-2">Username</label>
                        <Input 
                            type="text" 
                            id="username" 
                            name="username" 
                            className="w-full p-2 border rounded text-black focus:outline-none focus:ring-2 focus:ring-yellow-500" 
                            placeholder="Enter your username" 
                            value={username}
                            onChange={onChangeUsername}
                            validations={[required]}
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="password" className="block text-white mb-2">Password</label>
                        <Input 
                            type="password" 
                            id="password" 
                            name="password" 
                            className="w-full p-2 border rounded text-black focus:outline-none focus:ring-2 focus:ring-yellow-500" 
                            placeholder="Enter your password"
                            value={password}
                            onChange={onChangePassword}
                            validations={[required]}
                        />
                    </div>
                    <div className="flex justify-center mb-2">
                        <button 
                            type="submit" 
                            className="w-full bg-yellow-500 text-white py-2 rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                            disabled={loading}
                        >
                            {loading && <span className="spinner-border spinner-border-sm"></span>}
                            Login
                        </button>
                    </div>

                    {message && (
                        <div className="form-group">
                            <div className="alert alert-danger" role="alert">
                                {message}
                            </div>
                        </div>
                    )}
                    <CheckButton style={{ display: "none" }} ref={checkBtn} />

                    <h3 className="text-center text-white text-sm font-normal mb-2">Or</h3>
                    <div className="flex justify-center">
                        <button 
                            type="button" 
                            className="w-full bg-yellow-500 text-white py-2 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 flex items-center justify-center"
                            onClick={handleGoogleLogin}
                        >
                            <img 
                                src="https://img.icons8.com/color/16/000000/google-logo.png" 
                                alt="Google logo" 
                                className="mr-2"
                            /> 
                            Login with Google
                        </button>
                    </div>
                    <p className="mt-4 text-center text-white text-sm">
                        Belum punya akun? <Link to="/register" className="text-yellow-500 hover:underline">Daftar di sini</Link>
                    </p>
                </Form>
            </div>
        </div>
    );
};

export default LoginPage;
