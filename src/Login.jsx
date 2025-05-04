import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth, provider } from "./firebase";
import {
    signInWithPopup,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    sendPasswordResetEmail,
    RecaptchaVerifier
} from "firebase/auth";
import "./Login1.css";
 
const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [resetEmail, setResetEmail] = useState("");
    const [showResetForm, setShowResetForm] = useState(false);
    const [message, setMessage] = useState("");
    const [captchaVerified, setCaptchaVerified] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        window.recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha-container", {
            'size': 'normal',
            'callback': (response) => {
                setCaptchaVerified(true);
            },
            'expired-callback': () => {
                setCaptchaVerified(false);
            }
        });
        window.recaptchaVerifier.render();
    }, []);

    const handleGoogleSignIn = async () => {
        if (!captchaVerified) {
            setError("Please verify the reCAPTCHA.");
            return;
        }
        try {
            const result = await signInWithPopup(auth, provider);
            localStorage.setItem("userEmail", result.user.email);
            navigate("/1");
        } catch (error) {
            setError("Google Sign-In Error: " + error.message);
        }
    };

    const handleEmailSignUp = async () => {
        if (!captchaVerified) {
            setError("Please verify the reCAPTCHA.");
            return;
        }
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            localStorage.setItem("userEmail", userCredential.user.email);
            navigate("/1");
        } catch (error) {
            setError("Sign-Up Error: " + error.message);
        }
    };

    const handleEmailSignIn = async () => {
        if (!captchaVerified) {
            setError("Please verify the reCAPTCHA.");
            return;
        }
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            localStorage.setItem("userEmail", userCredential.user.email);
            navigate("/1");
        } catch (error) {
            setError("Sign-In Error: " + error.message);
        }
    };

    const handleResetPassword = async () => {
        if (!resetEmail) {
            setMessage("Please enter your email.");
            return;
        }
        try {
            await sendPasswordResetEmail(auth, resetEmail);
            setMessage("Password reset email sent! Check your inbox.");
        } catch (error) {
            setMessage("Error: " + error.message);
        }
    };

    return (
        
        <div className="login-container">
            <h2>Login</h2>
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            
            <div id="recaptcha-container"></div>
            
            <button onClick={handleEmailSignUp}>Sign Up with Email</button>
            <button onClick={handleEmailSignIn}>Sign In with Email</button>
            <button onClick={handleGoogleSignIn}>Sign In with Google</button>
            {error && <p className="error-message">{error}</p>}

            <p className="forgot-password" onClick={() => setShowResetForm(true)}>
                Forgot Password?
            </p>

            {showResetForm && (
                <div className="reset-container">
                    <h3>Reset Password</h3>
                    <input type="email" placeholder="Enter your email" value={resetEmail} onChange={(e) => setResetEmail(e.target.value)} />
                    <button onClick={handleResetPassword}>Send Reset Email</button>
                    <button onClick={() => setShowResetForm(false)}>Cancel</button>
                    <p>{message}</p>
                </div>
            )}
        </div>
    );
};

export default Login;
