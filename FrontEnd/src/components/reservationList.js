import axios from "axios";
import React, { useEffect, useState } from "react";
import "../style/reservationDetails.css";

function ReservationList() {
    const [reservations, setReservations] = useState([]);

    useEffect(() => {
        async function fetchReservations() {
            try {
                const res = await axios.post("http://localhost:3000/reserveList");
                console.log(res.data);
                setReservations(res.data.reservations);
            } catch (error) {
                console.error("Error fetching reservations:", error);
            }
        }
        fetchReservations();
    }, []);
    console.log(reservations);
    return (
        <React.Fragment>
            <h1>Reservation List</h1>
            <ul>
                {reservations && reservations.length > 0 ? (
                    reservations.map((reservation, index) => (
                            <section id="reservation-details">
                                <h3>Date: {reservation.reservationDate}</h3>
                                <h3>Time: {reservation.reservationTime}</h3>
                                <h3>Guests: {reservation.numGuests}</h3>
                                <h3>Occasion: {reservation.occasion }</h3>
                            </section>
                    ))
                ) : (
                    <li>No reservations found</li>
                )}
            </ul>
        </React.Fragment>
    );
}

export default ReservationList;