
const dbCommandsEnum = {
    'createCafeDb':createCafeDb,
    'populateMenuItems':populateMenuItems,
    'tables':   {
        'users':createUsersTable,
        'reservations':createReservationsTable,
        'menuitems':createMenuItemsTable,
    }
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

function createMenuItemsTable ()
{
    let sql = `CREATE TABLE IF NOT EXISTS menuItems    (   
    itemName VARCHAR(255) PRIMARY KEY,
    itemPrice DECIMAL(10, 2) NOT NULL,
    itemImagePath VARCHAR(255) NOT NULL)`;
    return sql;
}

function populateMenuItems (){
    const values = [
        ['tea', '15', 'http://localhost:3000/assests/images/tea.jpg'],
        ['coffee', '20', 'http://localhost:3000/assests/images/coffee.avif'],
        ['elanji', '30', 'http://localhost:3000/assests/images/Elanji.jpeg'],
        ['kaypola', '40', 'http://localhost:3000/assests/images/kaypola.jpeg'],
        ['ullivada', '50', 'http://localhost:3000/assests/images/ullivada.webp'],
        ['tenderCoconut', '40', 'http://localhost:3000/assests/images/tenderCoconut.jpg'],
        ['bananaHalwa', '50', 'http://localhost:3000/assests/images/bananaHalwa.jpg']
    ];
    let sqlCmd = `INSERT INTO menuitems (itemName, itemPrice, itemImagePath) VALUES ?`;
    return [sqlCmd, [values]];
}


module.exports = {  dbCommandsEnum };