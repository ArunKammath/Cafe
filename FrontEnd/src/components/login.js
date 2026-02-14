import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "./user"; 


function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loginData, setLoginData] = useState({
        username: "",
        password: ""
    });

    const handleChange = (e) => {
        setLoginData({
            ...loginData,
            [e.target.name]: e.target.value
        });
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const loginTime = new Date().getTime();
        const res = await axios.post("http://localhost:3000/login", {username: loginData.username, password: loginData.password, loginTime: loginTime}, {
            withCredentials: true
        });
       
        setLoginData({
            username: "",
            password: "",
        });
        if(res.data.valid===false) {
          alert(res.data.message);
        }
        else {
            dispatch(setUser({
                username: loginData.username,   
                password: loginData.password, 
                userId: res.data.userId,
                loginTime: loginTime
            }));
            navigate("/reservations");
        }   
    };
    return (
        <React.Fragment>
            <section id="login">
                <form id="loginForm" onSubmit={handleSubmit}>   
                    <label htmlFor="username">Username :    
                        <input type="text" id="username" name="username" value={loginData.username} onChange={handleChange} />
                    </label>
                    <label htmlFor="password">Password :
                        <input type="password" id="password" name="password" value={loginData.password} onChange={handleChange} />
                    </label>
                    <button type="submit">Login</button>
                </form>
                <p>Don't have an account? <Link to="/registration">Register</Link></p>    
            </section>
        </React.Fragment>
        )
}

export async function fetchLoginData() {
    try {
      const res = await axios.get('http://localhost:3000/getLoginData',{
        withCredentials: true
      });
      return res.data;
    } catch (error) {
      console.error('Error in fetching login data:', error);
      return undefined;
    }
  }

export { Login };