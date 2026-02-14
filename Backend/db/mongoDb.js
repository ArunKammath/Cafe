const mongoose = require('mongoose');
require('dotenv').config();
const OrdersSchema = new mongoose.Schema({
    userId: {
        type: String
    },
    orderList: {
        type: Array
    }
});

const Order = mongoose.model('Orders', OrdersSchema);

mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.log('Error connecting to MongoDB', err);
});

module.exports = Order;





