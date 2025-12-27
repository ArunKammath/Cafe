import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLogin } from "./booking";
import { RightTabLogin } from "./rightTabLogin";
import { OrderCard } from "./card";
import "../style/orderList.css";

function OrderList() {
    const { loginData } = useLogin();
    const [orders, setOrders] = useState([]);
    useEffect(() => {
        async function fetchOrders() {
            const res = await axios.post("http://localhost:3000/orderList", {userId: loginData.userId});    
            //console.log("res.data.orders", res.data.orders);
            setOrders(res.data.orders);
        }
        fetchOrders();
    }, [loginData.userId]);

    return (
        <React.Fragment>
            <section className="myOrders">
                <RightTabLogin />
                <section className="orderList">
                    {orders.map((order, index) => {
                            return (
                                <OrderCard orderList={order.orderList} orderNo={index} />
                            )
                        })}
                </section>
            </section>
        </React.Fragment>
    )
}

export default OrderList;
