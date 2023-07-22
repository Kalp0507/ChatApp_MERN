import React, { useContext, useRef } from "react";
import './login.css'
import { loginCall } from "../../apiCalls";
import AuthContext from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";


export default function Login() {
    const username = useRef()
    const password = useRef()
    const { isFetching, dispatch } = useContext(AuthContext)
    const navigate = useNavigate()

    const handleCLick = (e) => {
        try {
            e.preventDefault();
            loginCall(
                {
                    username: username.current.value,
                    password: password.current.value
                },
                dispatch
            )
            navigate('/')

        } catch (e) {
            console.log(e)
        }

    }

    return (
        <form action="" className="loginForm" onSubmit={handleCLick}>
            <h1>LOGIN</h1>
            <div className="usernameDiv">
                <label htmlFor="username">Username:</label>
                <input type="text" id="username" name="username" autoComplete="off" ref={username} />
            </div>
            <div className="passwordDiv">
                <label htmlFor="password">Password:</label>
                <input type="password" id="password" name="password" ref={password} />
                <a href="">Forgot Password?</a>
            </div>
            <input type="submit" value="Login" />

            <div className="logRegister">
                <span>Don't have an account?? </span>
                <button className="logRegisterBtn" onClick={() => { navigate('/register'); }}>
                    {isFetching ? (
                        <CircularProgress color="success" size="20px" />
                    ) : (
                        "Create New"
                    )}
                </button>
            </div>
        </form>
    )
}