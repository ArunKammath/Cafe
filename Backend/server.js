const express = require('express');
const app = express();
const cors = require('cors');
const db = require('./db'); // Import database connection

app.use(cors());
app.use(express.json()); // Parse JSON request bodies
const PORT = 3000;

app.post('/login', (req, res) => {console.log("req.body", req.body);
    const checkSql = 'SELECT username, password FROM users ';
    db.query(checkSql, (err, userList) => {
        if (err) {
            console.error('Error checking users:', err);
            return res.status(500).json({message: 'Error checking users'});
        }
        let isFound=false;
        for(let i = 0; i < userList.length; i++) {
            if(userList[i].username === req.body.username && userList[i].password === req.body.password) {
                isFound=true;
                break;
            }
        }
        if(!isFound) {
            return res.json({valid: false, message: 'Username or password is incorrect'});
        }
        // Login successful - username found
        return res.json({valid: true, message: 'Login successful'});
    });
});

app.post('/reserveList', (req, res) => {
    console.log("req.body", req.body);
    const checkSql = 'SELECT * FROM reservations';
    db.query(checkSql, (err, result) => {
        if (err) {
            console.error('Error checking reservations:', err);
            return res.status(500).json({message: 'Error checking reservations'});
        }
        return res.json({ reservations: result});
    });
});

app.post('/registration', (req, res) => {
    console.log("req.body", req.body);
    const checkSql = 'SELECT username FROM users ';
    db.query(checkSql, (err, userList) => {
        if (err) {
            console.error('Error checking users:', err);
            return res.status(500).json({message: 'Error checking users'});
        }
        for(let i = 0; i < userList.length; i++) {
            if(userList[i].username === req.body.username) {
                return res.json({valid: false, message: 'Username already exists'});
            }
        }

        const insertSql = 'INSERT INTO users (username, password) VALUES (?, ?)';
        const values = [req.body.username, req.body.password];
        db.query(insertSql, values, (err, result) => {
            if (err) {
                console.error('Error inserting user:', err);
                return res.status(500).json({message: 'Error inserting user'});
            }
            return res.json({valid: true, message: 'User registered successfully'});
        });
    });

});

app.post('/reservations', (req, res) => {
    console.log("req.body", req.body);
    const checkSql = 'SELECT * FROM reservations';
    db.query(checkSql, (err, result) => {
        if (err) {
            console.error('Error checking reservations:', err);
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
        
        // Insert req.body into MySQL database
        if(req.body.isLoggedIn) {
            const insertSql = 'INSERT INTO reservations (reservationDate, reservationTime, numGuests, occasion) VALUES (?, ?, ?, ?)';
            const values = [req.body.booking.date, req.body.booking.time, req.body.booking.numGuests, req.body.booking.occasion];
            db.query(insertSql, values, (err, result) => {
                if (err) {
                    console.error('Error inserting reservation:', err);
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
    console.log("req.body", req.body);
    const checkSql = 'DELETE FROM reservations WHERE reservationDate = ? AND reservationTime = ?';
    const values = [req.body.reservationDate, req.body.reservationTime];
    db.query(checkSql, values, (err, result) => {
        if (err) {
            console.error('Error deleting reservation:', err);
            return res.status(500).json({message: 'Error deleting reservation'});
        }
        return res.json({message: 'Reservation deleted successfully'});
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

