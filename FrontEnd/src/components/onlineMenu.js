import React, { useState } from "react";
import tea from "../images/tea.webp";
import coffee from "../images/coffee.avif";
import Elanji from "../images/Elanji.jpeg";
import kaypola from "../images/kaypola.jpeg";
import ullivada from "../images/ullivada.webp";
import tenderCoconut from "../images/tenderCoconut.jpg";
import bananaHalwa from "../images/bananaHalwa.jpg";
import { useLogin } from "./booking";
import { RightTabLogin } from "./rightTabLogin";
import Card from "./card";
import "../style/cart.css";
import Cart from "./cart";

function OrderOnline() {
    const { loginData } = useLogin();
    let loggedIn = loginData.isLoggedIn;
    const itemPrice = {
        tea: 15,
        coffee: 20,
        elanji: 30,
        kaypola: 40,
        ullivada: 50,
        tenderCoconut: 40,
        bananaHalwa: 50
    }
    const [itemCount, setItemCount] = useState({
        tea: 0,
        coffee: 0,
        elanji: 0,
        kaypola: 0,
        ullivada: 0,
        tenderCoconut: 0,
        bananaHalwa: 0,
        total: 0
    });

    const items = {itemCount: itemCount, setItemCount: setItemCount, itemPrice: itemPrice, loggedIn: loggedIn};

    return (
        <React.Fragment>
        <section id="onlineOrder">
            <RightTabLogin />
            <section id="onlineMenu">
                <section id="menu ">
                    <section id="beverages">
                        <header>
                            <h1>Beverages</h1>
                        </header>
                        <section id="beverageList">
                                <Card image={tea} name="tea" items={items} />
                                <Card image={coffee} name="coffee" items={items} />
                        </section>
                    </section>
                    <section id="snacks">
                        <header>
                            <h1>Snacks</h1>
                        </header>
                        <section id="snacksList">
                            <Card image={Elanji} name="elanji" items={items} />
                            <Card image={kaypola} name="kaypola" items={items} />
                            <Card image={ullivada} name="ullivada" items={items} />
                        </section>
                    </section>
                    <section id="desserts">
                        <header> 
                            <h1>Desserts</h1>
                        </header>
                        <section id="dessertsList">
                            <Card image={tenderCoconut} name="tenderCoconut" items={items} />
                            <Card image={bananaHalwa} name="bananaHalwa" items={items} />
                        </section>
                    </section>
                </section>
                <Cart items={items} />
            </section>
        </section>
        </React.Fragment>
    );
  }
export { OrderOnline };