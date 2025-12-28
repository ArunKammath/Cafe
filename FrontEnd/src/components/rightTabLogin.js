import { Link } from "react-router-dom";    
import { useLogin } from "./booking";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../style/rightTabLogin.css";
import axios from "axios";
import { fetchLoginData } from "./booking";

function RightTabLogin() {
  const { loginData, setLoginData } = useLogin();
  useEffect(() => {
    fetchLoginData().then(data => {
      setLoginData({...loginData, isLoggedIn: data.loggedIn, userId: data.userId, username: data.username, password: data.password});
     }).catch(error => {
      console.error('Error fetching login data:', error);
     });
  }, [])
  let loggedIn = loginData.isLoggedIn;
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:3000/logout', {
        withCredentials: true
      });
    } catch (error) {
      console.error('Error in logging out:', error);
    }
    setLoginData({...loginData, isLoggedIn: false, username: "", password: "", userId: ""});  
    navigate("/");
  }
  return (
    <React.Fragment>
      {loggedIn && (
        <section id="righttab">
          <div >
            <h1>Welcome !!</h1>
            <h1>{loginData.username}</h1>
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