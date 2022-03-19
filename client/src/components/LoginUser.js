import React, {useContext, useRef} from 'react';
import mainContext from "../context/mainContext";
import {useNavigate} from "react-router-dom";
import http from "../plugin/http";

const LoginUser = () => {

    const {error, setError, user, setLoggedIn} = useContext(mainContext)

    const nav = useNavigate()

    const email = useRef()
    const password = useRef()
    const loggedIn = useRef()

    async function login() {
        const userLog = {
            email: email.current.value,
            password: password.current.value,
            loggedIn: loggedIn.current.checked
        }

        await http.post(userLog, "/login").then(data => {
            if (!data.success) {
                setError(data.message)
            } else {
                localStorage.setItem("userId", data.user.id)
                setError(null)
                setLoggedIn(data.user.email)
                if (user.isAdmin === true) {
                    nav("/upload")
                } else {
                    nav("/")
                }
            }
        })
    }

    return (
        <div className="box0">
            <div className="box0">
                <input ref={email} className="inp" type="text" placeholder="email"/>
                <input ref={password} className="inp" type="text" placeholder="password"/>
            </div>

            <div className="flex">
                <label htmlFor="check">Stay logged in</label>
                <input ref={loggedIn} type="checkbox" id="check"/>
            </div>

            <button onClick={login} className="btn">Login</button>
            {error && <h3>{error}</h3>}
        </div>
    );
};

export default LoginUser;