const express = require('express');
const app = express();
const cors = require('cors');
const db = require('./db'); // Import database connection

app.use(cors());
app.use(express.json()); // Parse JSON request bodies


const PORT = 3000;

app.post('/reservations', (req, res) => {
    console.log(req.body);
    
    // Insert req.body into MySQL database
    const sql = 'INSERT INTO reservations (reservationDate, reservationTime, numGuests, occasion) VALUES (?, ?, ?, ?)';
    const values = [req.body.date, req.body.time, req.body.numGuests, req.body.occasion];
    db.query(sql, values, (err, result) => {
    if (err) throw err;
    console.log('Reservation saved:', result);
  });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});