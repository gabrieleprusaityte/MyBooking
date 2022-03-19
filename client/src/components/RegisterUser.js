import React, {useContext, useRef} from 'react';
import "./style.css"
import http from "../plugin/http"
import mainContext from "../context/mainContext";
import {useNavigate} from "react-router-dom";

const RegisterUser = () => {

    const {error, setError, setUser} = useContext(mainContext)

    const nav = useNavigate()

    const email = useRef()
    const password1 = useRef()
    const password2 = useRef()
    const admin = useRef()

   async function register() {
        const user = {
            email: email.current.value,
            password1: password1.current.value,
            password2: password2.current.value,
            isAdmin: admin.current.checked
        }

        await http.post(user, "/register").then(data => {
            if (!data.success) {
                setError(data.message)
            } else {
                setError(null)
                nav("/login")
                setUser(data.user)
            }
        })
    }

    return (
        <div className="box0">
            <div className="box0">
                <input ref={email} className="inp" type="text" placeholder="email"/>
                <input ref={password1} className="inp" type="text" placeholder="password1"/>
                <input ref={password2} className="inp" type="text" placeholder="password2"/>
            </div>

            <div className="flex">
                <label htmlFor="check">Admin</label>
                <input ref={admin} type="checkbox" id="check"/>
            </div>

            <button onClick={register} className="btn">Register</button>
            {error && <h3>{error}</h3>}
        </div>
    );
};

export default RegisterUser;