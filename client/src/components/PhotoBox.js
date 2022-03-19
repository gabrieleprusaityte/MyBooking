import React from 'react';
import "./style.css"
import Photo from "./Photo";

const PhotoBox = ({photos, setPhotos}) => {

    return (
        <div className="pictureBox">
            {photos.map((x, i) => <Photo setPhotos={setPhotos} photo={x} key={i} />)}
        </div>
    );
};

export default PhotoBox;