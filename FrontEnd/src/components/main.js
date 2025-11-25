import logo from "../images/logo.jpg";
import snacksImage from "../images/snacks.jpg";
import Elanji from "../images/Elanji.jpeg";
import kaypola from "../images/kaypola.jpeg";
import ullivada from "../images/ullivada.webp";
import star from "../images/star.png";
import { Link } from "react-router-dom";
import React from "react";

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

function TopNav() {
  return (
    <nav id="navigation">
      <img src={logo} alt="logo" />
      <Link to="/">
        <button>Home</button>
      </Link>
      <Link to="/about">
        <button>About</button>
      </Link>
      <Link to="/contact">
        <button>Contact</button>
      </Link>
      <Link to="/reservations">
        <button>Reservations</button>
      </Link>
      <Link to="/orderonline">
        <button>Order online</button>
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
        <section id="elanji">
          <img src={Elanji} alt="Elanji" />
          <h1>Elanji</h1>
          <p>A mix of grated coconut and dryfruits!</p>
        </section>
        <section id="kaypola">
          <img src={kaypola} alt="Kaypola" />
          <h1>Kaypola</h1>
          <p>Fruits in an Egg cake!</p>
        </section>
        <section id="ullivada">
          <img src={ullivada} alt="Ullivada" />
          <h1>Ullivada</h1>
          <p>Onion with batter deep fried!</p>
        </section>
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
  return (
    <header id="about">
      <h1>About Us</h1>
      <p>
        Started in 2020 by a group of friends who were passionate about kerala
        spices and flavours
      </p>
      <p>
        We use the fresh ingredients and the best quality products to make our
        food
      </p>
      <p>
        With 50 tea varieties and 100 snacks, we are sure to have something for
        everyone
      </p>
    </header>
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