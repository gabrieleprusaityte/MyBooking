import React from 'react';
import "./style.css"
import http from "../plugin/http";

const Photo = ({photo, setPhotos}) => {

    function deletePhoto() {
        const photoDelete = {
            id: photo.id
        }

        http.post(photoDelete, "/deletePhoto").then(data => {
            setPhotos(data)
        })
    }

    return (
        <div className="flex column">
            <img className="img2" src={photo.photo} alt=""/>
            <button className="btn1" onClick={deletePhoto}>Delete</button>
        </div>
    );
};

export default Photo;