import React, {useContext, useRef} from 'react';
import "./style.css"
import http from "../plugin/http";
import mainContext from "../context/mainContext";

const Filter = () => {

    const {setPosts} = useContext(mainContext)

    const city = useRef()
    const price = useRef()

    function filterOffers() {
        const filteredPosts = {
            city: city.current.value,
            price: price.current.value,
        }

        http.post(filteredPosts, "/filterPosts").then(data => {
            setPosts(data.posts)

        })
    }

    return (
        <div className="flex column">
            <div>
                <label htmlFor="city">City:</label>
                <input ref={city} className="inp1" type="text" placeholder="city" id="city"/>
            </div>
            <div>
                <label htmlFor="">Price:</label>
                <input ref={price} className="inp1" type="text" placeholder="price"/>

            </div>
            <div>
                <button onClick={filterOffers} className="btn">Search</button>
            </div>
        </div>
    );
};

export default Filter;