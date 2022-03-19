import React, {useEffect} from 'react';
import "./style.css"
import {Link, useNavigate} from "react-router-dom";

const TitlePage = () => {

    const nav = useNavigate()

    useEffect(() => {
        nav("/")
    }, [])

    return (
        <div className="main-cover flex column">
            <h1>Welcome!</h1>
            <h1>Look for your dream space!</h1>
            <Link to="/main">
                <h1>Browse and find the one and only!</h1>
            </Link>

        </div>
    );
};

export default TitlePage;