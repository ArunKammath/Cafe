import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { RightTabLogin } from "./rightTabLogin";
import { OrderCard } from "./card";
import "../style/orderList.css";

function OrderList() {
    const userData = useSelector((state) => state.user.userData);
    const [orders, setOrders] = useState([]);
    useEffect(() => {
        async function fetchOrders() {
            const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/orderList`, {userId: userData.userId});     
            setOrders(res.data.orders);
        }
        fetchOrders();
    }, [userData.userId]);
    
    const ordersPresent = orders.length > 0 ? true : false;
    return (
        <React.Fragment>
            <section className="myOrders">
                <RightTabLogin />
                <section className="orderList">
                    {ordersPresent && orders.map((order, index) => {
                            return (
                                <OrderCard orderList={order.orderList} orderNo={index} />
                            )
                        })}
                    {!ordersPresent && <h1>No orders found!!</h1>}
                </section>
            </section>
        </React.Fragment>
    )
}

export default OrderList;
