import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
function Login() {
    const [user, setUser] = useState({
        username: "",
        password: "",
    });
    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("user", user);
        const res = await axios.post("http://localhost:3000/login", user);
        if(res.data.valid===false) {
          alert(res.data.message);
        }
        setUser({
            username: "",
            password: "",
        });
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