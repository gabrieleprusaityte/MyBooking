import React, {useContext, useState} from 'react';
import "./style.css"
import mainContext from "../context/mainContext";
import DateRangePicker from '@wojtekmaj/react-daterange-picker'
import http from "../plugin/http";

const SinglePostView = () => {

    const {singlePost, setMyBookings} = useContext(mainContext)

    const [bookings, setBookings] = useState([])

    const [view, setView] = useState(false)

    const [value, onChange] = useState([new Date(), new Date()]);

    function makeReservation() {
        const reservationDate = {
            bookingDate: value,
            userId: localStorage.getItem("userId"),
            postId: localStorage.getItem("postId")
        }

        http.post(reservationDate, "/reserve").then(data => {
            setBookings(data.bookings)
            setMyBookings(data.userBooking)
        })
    }


    return (
        <div >
            <div className="box1">
                {singlePost.photos.map((x, i) => <div key={i}>
                    <img className="img1" src={x.photo} alt=""/>
                </div>)}
            </div>
            <div>
                <h5>Description: {singlePost.description}</h5>
                <div>City: {singlePost.city}</div>
                <div>Price: {singlePost.price} EUR</div>
            </div>
            <button onClick={() => setView(!view)}>Set Reservation</button>
            {view &&
            <div>
                <h3>Calendar</h3>
                <DateRangePicker onChange={onChange} value={value}/>
                <button onClick={makeReservation} className="btn">Submit</button>
                <div>
                    {bookings.map((x, i) => <div key={i}>
                        <div><b>- from </b> {x.bookingDate[0]}</div>
                        <div><b> to </b> {x.bookingDate[1]}</div>
                    </div>)}
                </div>
            </div>}
        </div>
    );
};

export default SinglePostView;