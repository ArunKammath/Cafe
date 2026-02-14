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
        const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/registration`, user);
        alert(res.data.message);
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