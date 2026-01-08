const dbCommandsEnum = {
    'createCafeDb':createCafeDb,
    'users':createUsersTable,
    'reservations':createReservationsTable
}

function createCafeDb ()
{
    let sql = `CREATE DATABASE IF NOT EXISTS cafe`;
    return sql;
}

function createUsersTable ()
{
    let sql = `CREATE TABLE IF NOT EXISTS users (
        userId VARCHAR(255) PRIMARY KEY,
        username VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL)`;
    return sql;
}

function createReservationsTable ()
{   
    let sql = `CREATE TABLE IF NOT EXISTS reservations (
    userId VARCHAR(255) NOT NULL,
    reservationId VARCHAR(255) PRIMARY KEY,
    reservationDate DATE NOT NULL,
    reservationTime TIME NOT NULL,
    numGuests INT NOT NULL,
    occasion VARCHAR(255) NOT NULL)`;
    return sql;
}



module.exports = {  dbCommandsEnum };