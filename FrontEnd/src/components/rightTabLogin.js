import { Link } from "react-router-dom";    
import { useLogin } from "./booking";
import React from "react";
import { useNavigate } from "react-router-dom";
function RightTabLogin() {
  const { loginData, setLoginData } = useLogin();
  let loggedIn = loginData.isLoggedIn;
  const navigate = useNavigate();
  const handleLogout = () => {
    setLoginData({...loginData, isLoggedIn: false, username: "", password: ""});  
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
          <Link to="/reservationlist">
            My Reservations
          </Link>
          <Link to="/orders">
            Orders
          </Link>
          <button onClick={handleLogout}>Logout</button>
        </section>
      )}
    </React.Fragment>
  )
}
export { RightTabLogin };