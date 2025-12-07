import { Link } from "react-router-dom";    
import { useLogin } from "./booking";
import React from "react";
import { useNavigate } from "react-router-dom";
import "../style/rightTabLogin.css";
function RightTabLogin() {
  const { loginData, setLoginData } = useLogin();
  let loggedIn = loginData.isLoggedIn;
  const navigate = useNavigate();
  const handleLogout = () => {
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
          <Link id="orders" to="/orders">
            My Orders
          </Link>
          <button id="logout" onClick={handleLogout}>Logout</button>
        </section>
      )}
    </React.Fragment>
  )
}
export { RightTabLogin };