// Filename - server.js

// importing mysql2 module (supports modern auth plugins)
const mysql = require('mysql2');

// configurations for creating mysql connection
const connection = mysql.createConnection({
    host: 'localhost',     // host for connection
    port: 3306,            // default port for mysql is 3306    // database from which we want to connect our node application
    user: 'root',          // username of the mysql connection
    password: '1234',
    database: 'mydb',      // database name
    dateStrings: true      // Return dates as strings instead of Date objects (YYYY-MM-DD format)
});

// executing connection
connection.connect(err => {
  if (err) throw err;
  /*let sql= 'create table reservations (reservationDate DATE, reservationTime TIME, numGuests INT, occasion varchar(255))';
  connection.query(sql, (err, result) => {
    if (err) throw err;
    console.log("result", result);
  });*/
  console.log('Connected to MySQL database');
});

// Export the connection for use in other files
module.exports = connection;