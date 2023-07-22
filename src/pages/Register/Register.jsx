import React from 'react';
import axios from 'axios';
import './register.css'
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

function Register() {
    const username = useRef()
    const email = useRef()
    const password = useRef()
    const rePassword = useRef()
    const navigate = useNavigate()

    const handleCLick = async (e) => {
        e.preventDefault();
        if (password.current.value !== rePassword.current.value) {
            rePassword.current.setCustomValidity("Passwords don't match !");
        } else {
            const user = {
                username: username.current.value,
                email: email.current.value,
                password: password.current.value,
            };
            try {
                await axios.post('/auth/register', user);
                navigate('/login')
            } catch (err) {
                console.log(err);
            }
        }
    }
    return (
        <>
            <div className="left">
                <h1>Welcome To myChat</h1>
                <p>Connect to your friends and people around you and tell them about your day!!</p>
            </div>
            <div className="right">
                <h2>Register here</h2>
                <form action="" onSubmit={handleCLick}>
                    <div className="usernameDiv">
                        <label htmlFor="username">Username:</label>
                        <input type="text" id='username' ref={username} required autoComplete="off" />
                    </div>
                    <div className="emailDiv">
                        <label htmlFor="email">Email:</label>
                        <input type="type" id='email' ref={email} required autoComplete="off" />
                    </div>
                    <div className="passwordDiv">
                        <label htmlFor="password">Password:</label>
                        <input type="password" id='password' ref={password} required autoComplete="off" />
                    </div>
                    <div className="passwordDiv">
                        <label htmlFor="password">Rewrite Password:</label>
                        <input type="password" id='rePassword' ref={rePassword} required autoComplete="off" />
                    </div>
                    <button type='submit'>Register</button>

                    <div className="logRegister">
                        <span> Have an account?? </span>
                        <button className="logRegisterBtn" onClick={() => { navigate('/login'); }}>
                            Log in
                        </button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Register
