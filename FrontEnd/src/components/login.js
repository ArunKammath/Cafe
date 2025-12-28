import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useLogin } from "./booking";
function Login() {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        username: "",
        password: "",
    });
    const {loginData, setLoginData} = useLogin();
    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await axios.post("http://localhost:3000/login", user);
        setUser({
            username: "",
            password: "",
        });
        if(res.data.valid===false) {
          alert(res.data.message);
        }
        else {
          setLoginData({...loginData, isLoggedIn: true, username: user.username,
             password: user.password, userId: res.data.userId, token: res.data.token});
          navigate("/reservations");
        }
        
    }
    return (
        <React.Fragment>
            <section id="login">
                <form id="loginForm" onSubmit={handleSubmit}>   
                    <label htmlFor="username">Username :    
                        <input type="text" id="username" name="username" value={user.username} onChange={handleChange} />
                    </label>
                    <label htmlFor="password">Password :
                        <input type="password" id="password" name="password" value={user.password} onChange={handleChange} />
                    </label>
                    <button type="submit">Login</button>
                </form>
                <p>Don't have an account? <Link to="/registration">Register</Link></p>    
            </section>
        </React.Fragment>
        )
}

export { Login };