import logo from "../images/logo.jpg";
import snacksImage from "../images/snacks.jpg";
import Elanji from "../images/Elanji.jpeg";
import kaypola from "../images/kaypola.jpeg";
import ullivada from "../images/ullivada.webp";
import star from "../images/star.png";
import { Link } from "react-router-dom";
import React from "react";
import { useLogin } from "./booking";
import {  Card } from "./card";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { useState } from "react";
function HomePage() {
  return (
    <React.Fragment>
      <HeroSection />
      <Main />
      <Testimonials />
      <About />
      <Contact />
    </React.Fragment>
  );
}
function GeneralTopNav() {
  const { loginData } = useLogin();
  let loggedIn = loginData.isLoggedIn;
  if(!loggedIn) {
    return (
      <React.Fragment>
      <Link to="/">
        <button>Home</button>
      </Link>
      <Link to="/about">
        <button>About</button>
      </Link>
      <Link to="/contact">
        <button>Contact</button>
      </Link>
      <Link to="/login">
        <button>Login</button>
      </Link>
      </React.Fragment>
    )
  }
}
function TopNav() {
  
  return (
    <nav id="navigation">
      <img src={logo} alt="logo" />
      <GeneralTopNav />
      <Link to="/reservations">
        <button>Reservations</button>
      </Link>
      <Link to="/orderonline">
        <button>Orders</button>
      </Link>
    </nav>
  );
}

function HeroSection() {
  return (
    <header id="heroSection">
      <section>
        <h1>Tattukkada</h1>
        <h2>Kochi</h2>
        <p>Authntic Kerala Food with a mix of traditional and modern cuisine</p>
        <p>Open from 10:00 AM to 12:00 pm and 4pm to 10pm</p>
        <Link to="/reservations"> 
          <button>Reserve a table</button>
        </Link>
      </section>
      <img src={snacksImage} alt="snacksImage" />
    </header>
  );
}

function Main() {
  return (
    <main id="highlights">
      <header>
        <h1>Specials</h1>
        <Link to="/orderonline">
        <button>Online Menu</button>
        </Link>
      </header>
      <section id="specials">
        <Card name="Elanji" description="A mix of grated coconut and dryfruits!" image={Elanji} />
        <Card name="Kaypola" description="Fruits in an Egg cake!" image={kaypola} />
        <Card name="Ullivada" description="Onion with batter deep fried!" image={ullivada} />
      </section>
    </main>
  );
}

function Star({ num }) {
  let stars = [];
  for (let i = 0; i < num; i++) {
    stars.push(<img src={star} alt="star" />);
  }
  return <div id="stars">{stars}</div>;
}

function Testimonials() {
  return (
    <header id="testimonials">
      <h1>Testimonials</h1>
      <section id="rating">
        <section>
          <Star num={5} />
          <h1>Ranchal</h1>
          <p>Kaypola or nothing!</p>
        </section>
        <section>
          <Star num={5} />
          <h1>Atul</h1>
          <p>Chai se pyaar hai!</p>
        </section>
        <section>
          <Star num={5} />
          <h1>Kammath</h1>
          <p>Ullivada the masterpiece!</p>
        </section>
      </section>
    </header>
  );
}

function About() {
  const [columnDefs, setColumnDefs] = useState([
    {    field: "name" },
    {    field: "age" },
    {    field: "email" },
    ]);
  const rowData = useState([
    { name: "John Doe", age: 25, email: "john.doe@example.com" },
  ]);
  return (
    <div className="ag-theme-quartz" style={{ height: 400, width: 600 }} id="about">
      <h1>About Us</h1>
      <AgGridReact columnDefs={columnDefs} rowData={rowData} />
    </div>
  );
}

function Contact() {
  return (
    <section id="footer">
      <img src={logo} alt="logo" />
      <p>Phone: 9876543210</p>
      <p>Email: tattukkada@gmail.com</p>
      <p>Address: somewhere, Kochi</p>
      <p>Copyright @ 2025 Tattukkada</p>
    </section>
  );
}

export { TopNav, HomePage, About, Contact };