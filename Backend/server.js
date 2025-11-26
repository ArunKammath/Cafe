const express = require('express');
const app = express();
const cors = require('cors');
const db = require('./db'); // Import database connection

app.use(cors());
app.use(express.json()); // Parse JSON request bodies
const PORT = 3000;

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
            if(bookingDate === req.body.date && bookingTime === req.body.time) {
                isPresent = true;
                break;
            }
        }
        
        if(isPresent) {
            res.json({valid: false, message: "No available slots for this time"});
            return;
        }
        
        // Insert req.body into MySQL database
        const insertSql = 'INSERT INTO reservations (reservationDate, reservationTime, numGuests, occasion) VALUES (?, ?, ?, ?)';
        const values = [req.body.date, req.body.time, req.body.numGuests, req.body.occasion];
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
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});