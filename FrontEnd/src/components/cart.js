import "../style/cart.css";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { resetItemCount } from "./menu";
function Cart() {
    const userData = useSelector((state) => state.user.userData);      
    const menu = useSelector((state) => state.menu.menu);
    const totalAmount = useSelector((state) => state.menu.totalAmount);
    const dispatch = useDispatch();
    
    const handlePlaceOrder = async () => {
        if(totalAmount === 0.00) {
            alert("No items in the cart");
            return;
        }
       const orderList = [];
       Object.keys(menu).forEach(item => {
        if( menu[item].itemCount > 0) {
            orderList.push({
                item: menu[item].itemName,
                amount: menu[item].itemPrice*menu[item].itemCount
            })
        }
       });
       orderList.push({
        item: "total",
        amount: totalAmount
       });
        axios.post('http://localhost:3000/orders',{userId: userData.userId, orderList: orderList}).then(response => {
            if(response.status === 200) {
                alert("Order placed successfully");
                dispatch(resetItemCount());
            } else {
                alert("Error placing order");
            }
        });
    }
    const cartItems = Object.keys(menu).filter(item => menu[item].itemCount > 0);
    if(cartItems.length > 0) {
        return (
            <section id="cart">
                <h1>Cart</h1>
                {cartItems.map((item, index) => (
                    <section key={index} id="item">
                        <h2>{menu[item].itemName}</h2>
                        <h2>{menu[item].itemCount}</h2>
                        <h2>Rs. {menu[item].itemPrice*menu[item].itemCount}</h2>
                    </section>
                ))}
                <section key={cartItems.length} id="item"> 
                        <h2>Total Amount</h2>
                        <h2>Rs. {totalAmount}</h2>
                </section>
                <button id="placeOrder" onClick={handlePlaceOrder}>Place Order</button>
            </section>
        )
    }
}

export default Cart;