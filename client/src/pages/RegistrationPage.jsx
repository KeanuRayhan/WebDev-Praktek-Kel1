import React, { useState, useRef } from 'react';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import CheckButton from 'react-validation/build/button';
import { isEmail } from 'validator';

import AuthService from '../services/auth.service';

const required = (value) => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                This field is required!
            </div>
        );
    }
};

const validEmail = (value) => {
    if (!isEmail(value)) {
        return (
            <div className="alert alert-danger" role="alert">
                This is not a valid email.
            </div>
        );
    }
};

const vusername = (value) => {
    if (value.length < 3 || value.length > 20) {
        return (
            <div className="alert alert-danger" role="alert">
                The username must be between 3 and 20 characters.
            </div>
        );
    }
};

const vpassword = (value) => {
    if (value.length < 6 || value.length > 40) {
        return (
            <div className="alert alert-danger" role="alert">
                The password must be between 6 and 40 characters.
            </div>
        );
    }
};

const vrepeatPassword = (value, password) => {
    if (value !== password) {
        return (
            <div className="alert alert-danger" role="alert">
                Passwords do not match.
            </div>
        );
    }
};

const RegistrationPage = () => {
    const form = useRef();
    const checkBtn = useRef();

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [successful, setSuccessful] = useState(false);
    const [message, setMessage] = useState("");

    const onChangeUsername = (e) => {
        const username = e.target.value;
        setUsername(username);
    };

    const onChangeEmail = (e) => {
        const email = e.target.value;
        setEmail(email);
    };

    const onChangePassword = (e) => {
        const password = e.target.value;
        setPassword(password);
    };

    const onChangeRepeatPassword = (e) => {
        const repeatPassword = e.target.value;
        setRepeatPassword(repeatPassword);
    };

    const handleRegister = (e) => {
        e.preventDefault();

        setMessage("");
        setSuccessful(false);

        form.current.validateAll();

        const repeatPasswordValidation = vrepeatPassword(repeatPassword, password);

        if (checkBtn.current.context._errors.length === 0 && !repeatPasswordValidation) {
            AuthService.register(username, email, password).then(
                (response) => {
                    setMessage(response.data.message);
                    setSuccessful(true);
                },
                (error) => {
                    const resMessage =
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString();

                    setMessage(resMessage);
                    setSuccessful(false);
                }
            );
        }
    };

    return (
        <div className="bg-black flex items-center justify-center h-screen">
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-96">
                <h2 className="text-center text-yellow-500 text-2xl font-bold mb-6">Registration</h2>
                <Form onSubmit={handleRegister} ref={form}>
                    {!successful && (
                        <div>
                            <div className="mb-4">
                                <label htmlFor="username" className="block text-white mb-2">Username</label>
                                <Input 
                                    type="text" 
                                    id="username" 
                                    name="username" 
                                    className="w-full p-2 border rounded text-black focus:outline-none focus:ring-2 focus:ring-yellow-500" 
                                    value={username}
                                    onChange={onChangeUsername}
                                    validations={[required, vusername]}
                                    placeholder="Enter your username" 
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="email" className="block text-white mb-2">Email</label>
                                <Input 
                                    type="text" 
                                    id="email" 
                                    name="email" 
                                    className="w-full p-2 border rounded text-black focus:outline-none focus:ring-2 focus:ring-yellow-500" 
                                    value={email}
                                    onChange={onChangeEmail}
                                    validations={[required, validEmail]}
                                    placeholder="Enter your email"
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="password" className="block text-white mb-2">Create Password</label>
                                <Input 
                                    type="password" 
                                    id="password" 
                                    name="password" 
                                    className="w-full p-2 border rounded text-black focus:outline-none focus:ring-2 focus:ring-yellow-500" 
                                    value={password}
                                    onChange={onChangePassword}
                                    validations={[required, vpassword]}
                                    placeholder="Enter your password" 
                                />
                            </div>
                            <div className="mb-6">
                                <label htmlFor="repeat-password" className="block text-white mb-2">Repeat Password</label>
                                <Input 
                                    type="password" 
                                    id="repeat-password" 
                                    name="repeat-password" 
                                    className="w-full p-2 border rounded text-black focus:outline-none focus:ring-2 focus:ring-yellow-500" 
                                    value={repeatPassword}
                                    onChange={onChangeRepeatPassword}
                                    validations={[required]}
                                    placeholder="Repeat your password" 
                                />
                            </div>
                            <div className="flex justify-center mb-2">
                                <button 
                                    type="submit" 
                                    className="w-3/4 bg-yellow-500 text-white py-2 rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                >
                                    Sign Up
                                </button>
                            </div>
                        </div>
                    )}
                    {message && (
                        <div className="form-group">
                            <div
                                className={ successful ? "alert alert-success" : "alert alert-danger" }
                                role="alert"
                            >
                                {message}
                            </div>
                        </div>
                    )}
                    <CheckButton style={{ display: "none" }} ref={checkBtn} />

                    <h3 className="text-center text-white text-sm font-normal mb-2">Or</h3>

                    <div className="flex justify-center">
                        <button 
                            type="button" 
                            className="w-3/4 bg-yellow-500 text-white py-2 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 flex items-center justify-center"
                        >
                            <img 
                                src="https://img.icons8.com/color/16/000000/google-logo.png" 
                                alt="Google logo" 
                                className="mr-2"
                            /> 
                            Sign Up with Google
                        </button>
                    </div>
                </Form>
            </div>
        </div>
    );
};

export default RegistrationPage;
