
import "../style/card.css";
import React from "react";

function Card(props)
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
        <section id="card">
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
export default Card;