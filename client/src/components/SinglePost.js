import React, {useContext} from 'react';
import "./style.css"
import http from "../plugin/http";
import {useNavigate} from "react-router-dom";
import mainContext from "../context/mainContext";

const SinglePost = ({post}) => {

    const {setSinglePost} = useContext(mainContext)

    const nav = useNavigate()

    async function showSingle() {
        const data = await http.get("/showSingle/"+post._id)
        setSinglePost(data)
        localStorage.setItem("postId", data._id)
        nav(`/single/${post._id}`)
    }


    return (
        <div onClick={showSingle} className="box1">
            <div>
                <img className="img2" src={post.photos[0].photo} alt=""/>
            </div>
            <div>
                <h3>Description: {post.description}</h3>
                <div>City: {post.city}</div>
                <div>Price: {post.price} EUR</div>
            </div>

        </div>
    );
};

export default SinglePost;