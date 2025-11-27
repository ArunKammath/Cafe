import React, { useState } from "react";
import axios from "axios";
function Registration() {
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
        const res = await axios.post("http://localhost:3000/registration", user);
        if(res.data.valid===false) {
          alert(res.data.message);
        }
        setUser({
            username: "",
            password: "",
        });
    }
    return (
        <section id="registration">
            <h1>Create Account</h1>
            <form id="registrationForm" onSubmit={handleSubmit}>
                <label htmlFor="username">Username :
                    <input type="text" id="username" name="username" value={user.username} onChange={handleChange} />
                </label>
                <label htmlFor="password">Password :
                    <input type="password" id="password" name="password" value={user.password} onChange={handleChange} />
                </label>
                <button type="submit">Register</button>
            </form>
        </section>
    )
}

export { Registration };