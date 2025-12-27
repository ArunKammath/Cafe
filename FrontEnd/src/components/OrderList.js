import React, { useEffect } from "react";
import axios from "axios";
import { useLogin } from "./booking";
import { RightTabLogin } from "./rightTabLogin";

function OrderList() {
    const { loginData } = useLogin();
    useEffect(() => {
        async function fetchOrders() {
            const res = await axios.post("http://localhost:3000/orderList", {userId: loginData.userId});    
            console.log("res.data.orders", res.data.orders);
        }
        fetchOrders();
    }, [loginData.userId]);
    return (
        <React.Fragment>
            <section id="myOrders">
                <RightTabLogin />
                <section id="orderList">
                    
                </section>
            </section>
        </React.Fragment>
    )
}

export default OrderList;
