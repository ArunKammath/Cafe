import "../style/cart.css";
function Cart({items}) {
    const itemCount = items.itemCount;
    const itemPrice = items.itemPrice;
    let amount=0.00;
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
            </section>
        )
    }
}

export default Cart;