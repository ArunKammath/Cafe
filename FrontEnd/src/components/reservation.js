import React, { useState } from "react";
import "../style/reservation.css"; 
import axios from "axios";
import { useLocation } from "react-router-dom";


function CheckAvailability() { 
  return (
    <React.Fragment>
      <input id="submit" type="submit" value="Check Availability" />
    </React.Fragment>
  )
}

function ReservationForm({booking, handleChange}) {
  return  (
    <React.Fragment>
    <label htmlFor="numGuests" style={{ fontSize: "20px"}}>Number of guests:
      <input type="number" id="guests" name="numGuests" value={booking.numGuests} onInput={handleChange} min={0}/>
    </label>
    <label htmlFor="occasion" style={{ fontSize: "20px" }}>Occasion :  
      <select id="occasion" name="occasion" value={booking.occasion} onChange={handleChange}>
        <option value="">Select an occasion</option>
        <option value="Birthday">Birthday</option>
        <option value="Anniversary">Anniversary</option>
      </select>
    </label>
    <input id="submit" type="submit" value="Make Your reservation" />   
    </React.Fragment>
  )
}

function Reservations() {
    const { userData } = useLocation().state || { userData: { username: "" } }

    let loggedIn = userData.username !== "";
    console.log(userData);
    const [booking, setBooking] = useState({
        date: "",
        time: "",
        numGuests:0,
        occasion: ""
    });

    const handleChange = (e) => {
      const value = e.target.name === "numGuests" ? Number(e.target.value) : e.target.value;
        setBooking({
            ...booking,
            [e.target.name]: value
        });
       
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await axios.post("http://localhost:3000/reservations", {booking, isLoggedIn: loggedIn});
        console.log(res.data);
        alert(res.data.message);
        // Reset form after submission
        setBooking({
            date: "",
            time: "",
            numGuests:0,
            occasion: "",
        });
    };

  return (
    <form id="reservations" onSubmit={handleSubmit}>
      <h1>Welcome {userData.username}</h1>
      <label htmlFor="res-date" style={{ fontSize: "20px"}}>Reservation date 
        <input type="date" id="res-date" name="date" value={booking.date} onChange={handleChange} />
      </label>
        <label htmlFor="res-time" style={{ fontSize: "20px" }}>Reservation time 
        <select id="res-time" name="time" value={booking.time} onChange={handleChange}>
          <option value="">Select a time</option>
          <option value="17:00">17:00</option>
          <option value="18:00">18:00</option>
          <option value="19:00">19:00</option>
          <option value="20:00">20:00</option>
          <option value="21:00">21:00</option>
          <option value="22:00">22:00</option>
        </select>
      </label>
      {loggedIn && <ReservationForm booking={booking} handleChange={handleChange}/>}
      {!loggedIn && <CheckAvailability />}
    </form>
  );
}
export { Reservations };