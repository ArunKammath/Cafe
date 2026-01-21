import React from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { RightTabLogin } from "./rightTabLogin";
import { MenuCard } from "./card";
import "../style/cart.css";
import Cart from "./cart";


async function fetchMenu() {
   try {
    const response = await axios.get('http://localhost:3000/getMenu');
    return response.data.menu;
    } catch (error) {
        console.error('Error fetching menu:', error);
        return {}
    }
   
}

function OrderOnline() {
    const menu = useSelector((state) => state.menu.menu);
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
                                <MenuCard item={menu.tea} />
                                <MenuCard item={menu.coffee} />
                        </section>
                    </section>
                    <section id="snacks">
                        <header>
                            <h1>Snacks</h1>
                        </header>
                        <section id="snacksList">
                            <MenuCard item={menu.elanji} />
                            <MenuCard item={menu.kaypola} />
                            <MenuCard item={menu.ullivada} />
                        </section>
                    </section>
                    <section id="desserts">
                        <header> 
                            <h1>Desserts</h1>
                        </header>
                        <section id="dessertsList">
                            <MenuCard item={menu.tenderCoconut} />
                            <MenuCard item={menu.bananaHalwa} />
                        </section>
                    </section>
                </section>
            </section>
            <Cart />
        </section>
        </React.Fragment>
    );
  }
export { OrderOnline , fetchMenu }; 