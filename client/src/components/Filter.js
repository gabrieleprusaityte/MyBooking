import React, {useContext, useRef} from 'react';
import "./style.css"
import http from "../plugin/http";
import mainContext from "../context/mainContext";

const Filter = () => {

    const {setPosts} = useContext(mainContext)

    const city = useRef()
    const priceFrom = useRef()
    const priceTo = useRef()
    const availabilityFrom = useRef()
    const availabilityTo = useRef()

    function filterOffers() {
        const filteredPosts = {
            city: city.current.value,
            priceFrom: priceFrom.current.value,
            priceTo: priceTo.current.value,
            availabilityFrom: availabilityFrom.current.value,
            availabilityTo: availabilityTo.current.value
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
                <label htmlFor="">Price: from </label>
                <input ref={priceFrom} className="inp1" type="text" placeholder="price FROM"/>
                <label htmlFor=""> to </label>
                <input ref={priceTo} className="inp1" type="text" placeholder="price TO"/>
            </div>
            <div>
                <label htmlFor="">Availability: from </label>
                <input ref={availabilityFrom} className="inp1" type="text" placeholder="available FROM"/>
                <label htmlFor="">to </label>
                <input ref={availabilityTo} className="inp1" type="text" placeholder="available TO"/>
            </div>
            <div>
                <button onClick={filterOffers} className="btn">Search</button>
            </div>
        </div>
    );
};

export default Filter;