import React, {useContext} from 'react';
import "./style.css"
import {Link} from "react-router-dom";
import mainContext from "../context/mainContext";



const Toolbar = () => {

    const {user, myBookings, show, setShow, loggedIn} = useContext(mainContext)

    return (
        <div className="toolbar">
            <Link to="/main">
                <h3>All Offers</h3>
            </Link>
            <Link to="/register">
                <h3>User Registration</h3>
            </Link>
            <Link to="/login">
                <h3>User Login</h3>
            </Link>
            {user.isAdmin === true ? <Link to="/upload">
                <h3>Upload Offer</h3>
            </Link> : ""}
            {loggedIn && <div>
                <h3 className="no-topBottom-margin">User Logged In: {loggedIn}</h3>
                {user.isAdmin ? <h4 className="no-topBottom-margin">Admin</h4> : <div />}
                <div onClick={() => setShow(!show)}>
                    <h4 className="no-topBottom-margin">My reservations: {myBookings.length}</h4>
                    {show && <div className="box3">
                        {myBookings.map((x, i) => <div key={i}>
                            <div><b>- from </b> {x.bookingDate[0]}</div>
                            <div><b> to </b> {x.bookingDate[1]}</div>
                        </div>)}
                    </div>}
                </div>
            </div>}
        </div>
    );
};

export default Toolbar;