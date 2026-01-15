import { Link } from "react-router-dom";    
import { useSelector, useDispatch } from "react-redux"; 
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../style/rightTabLogin.css";
import axios from "axios";
import { fetchLoginData } from "./login";
import { setUser } from "./user";

function RightTabLogin() {
  const userData = useSelector((state) => state.user.userData);
  const dispatch = useDispatch();
  
  useEffect(() => {
    fetchLoginData().then(data => {
      if (data && data.loggedIn === true) {
        dispatch(setUser({ userId: data.userId, username: data.username, password: data.password}));
      } else {
        // User is not logged in, clear the state
        dispatch(setUser({ userId: "", username: "", password: ""}));
      }
    }).catch(error => {
      console.error('Error fetching login data:', error);
      // On error, clear the state
      dispatch(setUser({ userId: "", username: "", password: ""}));
     });
  }, [dispatch])
  
  let loggedIn = userData.username !== "";
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:3000/logout', {}, {
        withCredentials: true
      });
    } catch (error) {
      console.error('Error in logging out:', error);
    }
    dispatch(setUser({ userId: "", username: "", password: ""}));  
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
        </section>
      )}
    </React.Fragment>
  )
}
export { RightTabLogin };