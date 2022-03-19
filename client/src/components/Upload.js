import React, {useContext, useRef, useState} from 'react';
import "./style.css"
import PhotoBox from "./PhotoBox";
import http from "../plugin/http";
import mainContext from "../context/mainContext";
import {useNavigate} from "react-router-dom";

const Upload = () => {

    const photoUrl = useRef()

    const city = useRef()
    const price = useRef()
    const description = useRef()

    const [photos, setPhotos] = useState([])

    const nav = useNavigate()

    const {error, setError, setPosts} = useContext(mainContext)

    function addPhoto() {
        const photo = {
            photo: photoUrl.current.value,
            userId: localStorage.getItem("userId")
        }

        http.post(photo, "/uploadPhoto").then(data => {
            if (!data.success) {
                setError(data.message)
            } else {
                setError(null)
                setPhotos(data.photos)
            }
        })
    }

    function uploadPost() {
        const post = {
            photos: photos,
            city: city.current.value,
            price: price.current.value,
            description: description.current.value,
            userId: localStorage.getItem("userId")
        }

        http.post(post, "/uploadPost").then(data => {
            console.log(data)
            if (!data.success) {
                setError(data.message)
            } else {
                setError(null)
                setPosts(data.posts)
                nav("/main")
            }
        })
    }

    return (
        <div>
            <div>
                <PhotoBox photos={photos} setPhotos={setPhotos}/>
                <input ref={photoUrl} className="inp" type="text" placeholder="photo"/>
                <button onClick={addPhoto} className="btn">Add</button>
            </div>
            <div className="box0">
                <input ref={city} className="inp" type="text" placeholder="city"/>
                <input ref={price} className="inp" type="text" placeholder="price"/>
                <input ref={description} className="inp" type="text" placeholder="description"/>
                <button onClick={uploadPost} className="btn">Upload</button>
                {error && <h3>{error}</h3>}
            </div>

        </div>
    );
};

export default Upload;