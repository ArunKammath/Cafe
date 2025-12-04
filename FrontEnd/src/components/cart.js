import "../style/cart.css";
function Cart({items}) {

    const itemCount = items.itemCount;
    const itemPrice = items.itemPrice;
    const setItemCount = items.setItemCount;
    let amount=0.00;
    const handlePlaceOrder = () => {
        console.log("Placed Order");
        setItemCount({
            tea: 0,
            coffee: 0,
            elanji: 0,
            kaypola: 0,
            ullivada: 0,
            tenderCoconut: 0,
            bananaHalwa: 0,
            total: 0
        });
    }
    if(itemCount.total > 0) {
        let itemList = [];
        for(let item in itemCount) {
            if(itemCount[item] > 0 ) {
                itemList.push(item);
                if(item!=="total") {
                    amount += Number(itemPrice[item])*Number(itemCount[item]);
                }
            }
        }
        
        console.log(amount);
        return (
            <section id="cart">
                <h1>Cart</h1>
                {itemList.map((item) => (
                    <section id="item">
                        <h2>{item}</h2>
                        <h2>{itemCount[item]}</h2>
                        <h2>{item!=="total" ? (Number(itemPrice[item])*Number(itemCount[item])).toFixed(2) : amount.toFixed(2)}</h2>
                    </section>
                ))}
                <button id="placeOrder" onClick={handlePlaceOrder}>Place Order</button>
            </section>
        )
    }
}

export default Cart;