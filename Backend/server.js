require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const sqlDb = require('./db/sqlDb'); // Import MySQL database connection from sqlDb.js
const Order = require('./db/mongoDb'); // Import MongoDB connection and Order model
const jwt = require('jsonwebtoken');

const PORT = process.env.PORT || 3000;
app.use(cors({
    origin: process.env.Frontend_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
  }));
app.use(cookieParser());
app.use(express.json()); // Parse JSON request bodies
app.use('/assests/images', express.static('assests/images')); // Serve static files from assests folder

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
    const token = req.cookies?.accessToken;
    if (!token) {
        return res.json({loggedIn: false, message: 'Unauthorized access'});
    }
  
    if (!process.env.ACCESS_TOKEN_SECRET) {
      console.error('Access token secret is not defined in environment variables');
      return res.json({loggedIn: false, message: 'Server configuration error'});
    }
  
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) {
        console.error('Error verifying token:', err.message);
        return res.json({loggedIn: false, message: 'Unauthorized access'});
      }
      const jwtData = jwt.decode(token);
      res.json({loggedIn: true, message: 'Token verified', userId: jwtData.userId, username: jwtData.username,
                 password: jwtData.password, loginTime: jwtData.loginTime});
      next();
    });
  }

app.post('/login', (req, res) => {
    const checkSql = 'SELECT username, password, userId FROM users ';
    sqlDb.connection.query(checkSql, (err, userList) => {
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
        console.log(req.body.loginTime);
        const accessToken = jwt.sign(
            { userId: userId, username: req.body.username , password: req.body.password, loginTime: req.body.loginTime},
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '15m' }
          )
        res.cookie('accessToken', accessToken, { httpOnly: true, secure: true, maxAge:  15 * 60 * 1000 });
        // Login successful - username found
        return res.json({isLoggedIn: true, message: 'Login successful', userId: userId, loginTime: req.body.loginTime});
    });
});

app.post('/logout', (req, res) => {
    res.clearCookie('accessToken', {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
    })
    return res.json({isLoggedIn: false, message: 'Logout successful'});
});


app.post('/registration', (req, res) => {
    const checkSql = 'SELECT username FROM users ';
    sqlDb.connection.query(checkSql, (err, userList) => {
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
        sqlDb.connection.query(insertSql, values, (err, result) => {
            if (err) {
                return res.status(500).json({message: 'Error inserting user'});
            }
            return res.json({valid: true, message: 'User registered successfully'});
        });
    });

});

app.get('/getLoginData',authenticateToken, (req, res) => {
    return res;
})

app.post('/reserveList', (req, res) => {
    const checkSql = 'SELECT * FROM reservations WHERE userId = ?';
    const values = [req.body.userId];
    sqlDb.connection.query(checkSql, values, (err, result) => {
        if (err) {
            console.error('Error checking reservations:', err);
            return res.status(500).json({message: 'Error checking reservations'});
        }
        return res.json({ reservations: result});
    });
});

app.post('/reservations',(req, res) => {
    const checkSql = 'SELECT * FROM reservations';
    sqlDb.connection.query(checkSql, (err, result) => {
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
            sqlDb.connection.query(insertSql, values, (err, result) => {
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
    sqlDb.connection.query(checkSql, values, (err, result) => {
        if (err) {
            return res.status(500).json({message: 'Error deleting reservation'});
        }
        return res.json({message: 'Reservation deleted successfully'});
    });
});

app.get('/getMenu', (req, res) => {    
    const checkSql = 'SELECT * FROM menuitems';
    sqlDb.connection.query(checkSql, (err, result) => {
        if (err) {
            return res.status(500).json({message: 'Error checking menu items'});
        }
        return res.status(200).json({menu: result});
    });
});

app.post('/orderList', async (req, res) => {
    const orderList = [] //await Order.find({userId: req.body.userId});
    res.json({orders: orderList});
});

app.post('/orders', async (req, res) => {
    /*const newOrder = await Order.insertOne({userId: req.body.userId, orderList: req.body.orderList});
    console.log("newOrder", newOrder);*/
    res.json({message: 'Order saved successfully'});
});



app.listen(PORT, () => {    
    console.log(`Server is running on ${PORT}`);
});


