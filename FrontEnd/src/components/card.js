
import "../style/card.css";
import React from "react";
import { useDispatch , useSelector} from "react-redux";
import { setItemCount } from "./menu";

function MenuCard({item})
{
    const userData = useSelector((state) => state.user.userData);
    const loggedIn = userData.username !== "";
    const dispatch = useDispatch(); 
    const handleAdd = (item) => {
        dispatch(setItemCount({itemName: item, type: "increment"}));
    }
    const handleRemove = (item) => {
        dispatch(setItemCount({itemName: item, type: "decrement"}));
    }
   
    return (
        <section id="menuCard">
            <img src={item.itemImagePath} alt={item.itemName} />
            <h2>{item.itemName}</h2>
            <h3>Rs. {item.itemPrice}</h3>
            {loggedIn && (
                <section id="quantity">
                    <button onClick={() => handleAdd(item.itemName)}>Add</button>
                    <input type="number" placeholder="Quantity" value={item.itemCount}/>
                    <button onClick={() => handleRemove(item.itemName)}>Remove</button>
                </section>
            )}
        </section>
    )
}   

function Card(props)
{
    return (
        <section id="card">
            <img src={props.image} alt={props.name} />
            <h1>{props.name}</h1>
            <p>{props.description}</p>
        </section>
    )
}

function OrderCard(props)
{
    const items = props.orderList;
    const orderNo = props.orderNo;
    return(
        <section className="orderCard">
            <h1>Order No.{orderNo+1}</h1>
            {items.map((item, index) => {
                return (
                    <section className="orderItem" key={index}>
                        <h3>{item.item}</h3>
                        <h4>Rs. {item.amount}</h4>
                    </section>
                );
            })}
    </section>
  );
}
export { MenuCard, Card, OrderCard };