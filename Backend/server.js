require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const db = require('./db'); // Import MySQL database connection
const Order = require('./db/mongoDb'); // Import MongoDB connection and Order model
const jwt = require('jsonwebtoken');

const PORT = process.env.PORT || 3000;
app.use(cors());
app.use(express.json()); // Parse JSON request bodies


function UniqueIdGenerator(type) {
    let num = Math.floor(1000 + Math.random() * 9000);
    if(type === 'reservation') {
        return 'RES-' + num.toString();
    }
    else if(type === 'user') {
        return 'USER-' + num.toString();
    } 
    return 'INVALID';
}

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    console.log("authHeader", authHeader);
    const token = authHeader && authHeader.split(' ')[1]
  
    if (!token) {
      console.log('No token provided');
      return res.sendStatus(401);
    }

    if (!process.env.JWT_SECRET) {
      console.error('JWT_SECRET is not defined in environment variables');
      return res.status(500).json({message: 'Server configuration error'});
    }
  
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        console.error('Error verifying token:', err.message);
        return res.sendStatus(403);
      }
      req.user = user;
      next();
    });
  }

app.post('/login', (req, res) => {
    const checkSql = 'SELECT username, password, userId FROM users ';
    db.query(checkSql, (err, userList) => {
        if (err) {
            return res.status(500).json({message: 'Error checking users'});
        }
        let isFound=false;
        let userId = "";
        for(let i = 0; i < userList.length; i++) {
            if(userList[i].username === req.body.username && userList[i].password === req.body.password) {
                isFound=true;
                userId = userList[i].userId;
                break;
            }
        }
        if(!isFound) {
            return res.json({valid: false, message: 'Username or password is incorrect'});
        }
        const token = jwt.sign(
            { userId: userId, username: req.body.username , password: req.body.password},
            process.env.JWT_SECRET,
            { expiresIn: '15m' }
          )
        // Login successful - username found
        return res.json({valid: true, message: 'Login successful', userId: userId, token: token});
    });
});


app.post('/registration', (req, res) => {
    const checkSql = 'SELECT username FROM users ';
    db.query(checkSql, (err, userList) => {
        if (err) {
            return res.status(500).json({message: 'Error checking users'});
        }
        for(let i = 0; i < userList.length; i++) {
            if(userList[i].username === req.body.username) {
                return res.json({valid: false, message: 'Username already exists'});
            }
        }
        const userId = UniqueIdGenerator('user');
        let j=0;
        while(j < userList.length) {
            if(userList[j].userId === userId) {
                userId = UniqueIdGenerator('user');
                j=0;
            }
            j++;
        }

        const insertSql = 'INSERT INTO users (userId, username, password) VALUES (?, ?, ?)';
        const values = [userId, req.body.username, req.body.password];
        db.query(insertSql, values, (err, result) => {
            if (err) {
                return res.status(500).json({message: 'Error inserting user'});
            }
            return res.json({valid: true, message: 'User registered successfully'});
        });
    });

});

app.get('/reservations',authenticateToken, (req, res) => {
    return res;
})

app.post('/reservations',(req, res) => {
    const checkSql = 'SELECT * FROM reservations';
    db.query(checkSql, (err, result) => {
        if (err) {
            return res.status(500).json({message: 'Error checking reservations'});
        }
        const bookingList = result;
        let isPresent = false;
        // Check if slot is already booked
        for(let i = 0; i < bookingList.length; i++) {
            const bookingDate = bookingList[i].reservationDate; 
            const bookingTime = bookingList[i].reservationTime ? bookingList[i].reservationTime.toString().slice(0, 5) : bookingList[i].reservationTime;
            if(bookingDate === req.body.booking.date && bookingTime === req.body.booking.time) {
                isPresent = true;
                break;
            }
        }
        
        if(isPresent) {
            res.json({valid: false, message: "No available slots for this time"});
            return;
        }

        const reservationId = UniqueIdGenerator('reservation');
        let i=0;
        while(i < bookingList.length) {
            if(bookingList[i].reservationId === reservationId) {
                reservationId = UniqueIdGenerator('reservation');
                i=0;
            }
            i++;
        }
        // Insert req.body into MySQL database
        if(req.body.isLoggedIn) {
            const insertSql = 'INSERT INTO reservations (userId, reservationId, reservationDate, reservationTime, numGuests, occasion) VALUES (?, ?, ?, ?, ?, ?)';
            const values = [req.body.booking.userId, reservationId, req.body.booking.date, req.body.booking.time, req.body.booking.numGuests, req.body.booking.occasion];
            db.query(insertSql, values, (err, result) => {
                if (err) {
                    return res.status(500).json({message: 'Error saving reservation'});
                }
                res.status(201).json({
                valid: true,
                message: 'Reservation saved successfully',
                });
            });
        }
        else {
            res.json({valid: true, message: "Available slots for this time"});
        }
    });
});

app.post('/ReservationList', (req, res) => {    
    const checkSql = 'DELETE FROM reservations WHERE reservationDate = ? AND reservationTime = ?';
    const values = [req.body.reservationDate, req.body.reservationTime];
    db.query(checkSql, values, (err, result) => {
        if (err) {
            return res.status(500).json({message: 'Error deleting reservation'});
        }
        return res.json({message: 'Reservation deleted successfully'});
    });
});

app.post('/orderList', async (req, res) => {
    const orderList = await Order.find({userId: req.body.userId});
    res.json({orders: orderList});
});

app.post('/orders', async (req, res) => {
    const newOrder = await Order.insertOne({userId: req.body.userId, orderList: req.body.orderList});
    console.log("newOrder", newOrder);
    res.json({message: 'Order saved successfully'});
});



app.listen(PORT, () => {    
    console.log(`Server is running on http://localhost:${PORT}`);
});


