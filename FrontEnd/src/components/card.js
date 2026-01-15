
import "../style/card.css";
import React from "react";

function MenuCard(props)
{
    const items = props.items;
    const itemPrice = items.itemPrice;
    const loggedIn = items.loggedIn;
    const itemCount = items.itemCount;
    const setItemCount = items.setItemCount;

    const handleAdd = (item) => {
        setItemCount({...itemCount,  [item]: itemCount[item] + 1, total: itemCount.total + 1});
    }
    const handleRemove = (item) => {
        if(itemCount[item] > 0){
            setItemCount({...itemCount, [item]: itemCount[item] - 1, total: itemCount.total - 1});
        }
    }

    return (
        <section id="menuCard">
            <img src={props.image} alt={props.name} />
            <h2>{props.name}</h2>
            <h3>Rs. {itemPrice[props.name]}</h3>
            {loggedIn && (
                <section id="quantity">
                    <button onClick={() => handleAdd(props.name)}>Add</button>
                    <input type="number" placeholder="Quantity" value={itemCount[props.name]}/>
                    <button onClick={() => handleRemove(props.name)}>Remove</button>
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