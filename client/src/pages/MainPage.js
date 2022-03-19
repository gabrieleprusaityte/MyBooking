import React, {useContext} from 'react';
import mainContext from "../context/mainContext";
import SinglePost from "../components/SinglePost";
import Filter from "../components/Filter";
import {useEffect} from "react";
import http from "../plugin/http";
import "./style.css"


const MainPage = () => {



    const {posts, setPosts} = useContext(mainContext)

    useEffect(() => {
        http.get("/main").then(data => {
            console.log(data)
            setPosts(data.posts)
        })
    }, [])

    return (
        <div >
            <div>
                <Filter />
            </div>
            <div className="flex wrap">
                {posts.map((x, i) => <SinglePost post={x} key={i}/>)}
            </div>

        </div>
    );
};

export default MainPage;