const mongoose = require('mongoose');
const OrdersSchema = new mongoose.Schema({
    userId: {
        type: String
    },
    orderList: {
        type: Array
    }
});

const Order = mongoose.model('Orders', OrdersSchema);

mongoose.connect('mongodb://localhost:27017/Cafe').then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.log('Error connecting to MongoDB', err);
});

module.exports = Order;





