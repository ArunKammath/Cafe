import { Link } from "react-router-dom";    
import { useSelector, useDispatch } from "react-redux"; 
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../style/rightTabLogin.css";
import axios from "axios";
import { fetchLoginData } from "./login";
import { setUser } from "./user";

function SessionTime({userData}){
  const sessionDuration = 5*60; //seconds
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loginTime = userData.loginTime;
  const [timeRemaining, setTimeRemaining] = useState({minutes: 0, seconds: 0});

  const sessionTimer = setInterval(() => {
    const currentTime = new Date().getTime();// in milliseconds
    const timeElapsed = (currentTime - loginTime)/1000;
    const remainingTime = sessionDuration - timeElapsed;
    if(remainingTime <= 0){
      clearInterval(sessionTimer);
      dispatch(setUser({ userId: "", username: "", password: "", loginTime: 0}));
      navigate("/login");
    }

    setTimeRemaining({minutes: Math.floor(remainingTime/60), seconds: Math.floor(remainingTime%60)});

  }, 1000);

  return (
    <div id="timer">
      <p>Session left:  {timeRemaining.minutes} m :{timeRemaining.seconds} s</p>
    </div>
  );
}

function RightTabLogin() {
  const userData = useSelector((state) => state.user.userData);
  const dispatch = useDispatch();
  
  useEffect(() => {
    fetchLoginData().then(data => {
      if (data && data.loggedIn === true) {
        dispatch(setUser({ userId: data.userId, username: data.username, password: data.password, loginTime: data.loginTime}));
      } else {
        // User is not logged in, clear the state
        dispatch(setUser({ userId: "", username: "", password: "", loginTime: 0}));
      }
    }).catch(error => {
      console.error('Error fetching login data:', error);
      // On error, clear the state
      dispatch(setUser({ userId: "", username: "", password: "", loginTime: 0}));
     });
  }, [dispatch])
  
  let loggedIn = userData.username !== "";
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await axios.post(`${(process.env.REACT_APP_BACKEND_URL || 'http://localhost:3000')}/logout`, {}, {
        withCredentials: true
      });
    } catch (error) {
      console.error('Error in logging out:', error);
    }
    dispatch(setUser({ userId: "", username: "", password: "", loginTime: 0}));  
    navigate("/");
  }
  return (
    <React.Fragment>
      {loggedIn && (
        <section id="righttab">
          <div >
            <h1>Welcome !!</h1>
            <h1>{userData.username}</h1>
          </div>
          <Link id="myReservations" to="/ReservationList">
            My Reservations
          </Link>
          <Link id="orders" to="/OrderList">
            My Orders
          </Link>
          <button id="logout" onClick={handleLogout}>Logout</button>
          <SessionTime userData={userData} />
        </section>
      )}
    </React.Fragment>
  )
}
export { RightTabLogin };