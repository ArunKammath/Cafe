

// importing mysql2 module (supports modern auth plugins)
const mysql = require('mysql2');  
const { dbCommandsEnum } = require('./dbCommands');

class SqlDb {
  constructor() {
    this.connection = mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',     // host for connection
      port: parseInt(process.env.DB_PORT, 10) || 3306,
      user: (process.env.DB_USER || 'root').replace(/^['"]|['"]$/g, '').trim(),
      password: (process.env.DB_PASSWORD || '').replace(/^['"]|['"]$/g, '').trim(),
      database: 'mysql',
      dateStrings: true,
      connectTimeout: 15000
    });
    this.connectToSqlDb();
  }

  connectToSqlDb() {
    // First, check and create database if it doesn't exist
    this.connection.connect(err => {
      if (err) throw err;
      
      // Check if database 'cafe' exists
      let checkDbSql = `SELECT COUNT(*) as db_exists 
                         FROM information_schema.schemata 
                         WHERE schema_name = 'cafe'`;
      this.connection.query(checkDbSql, (err, result) => {
        if (err) throw err;
        
        if (result[0].db_exists > 0) {
          // Database exists, proceed to connect
          this.connection.end();
          this.connectToDatabase();
        } else {
    
          // Create the database
          let createDbSql = dbCommandsEnum['createCafeDb'](); 
          this.connection.query(createDbSql, (err, result) => {
            if (err) throw err;
            // Now connect to the created database
            this.connection.end();
              this.connectToDatabase();
          });
        }
      });
    });
  }

  connectToDatabase() {
    require('dotenv').config();
    const host = (process.env.DB_HOST || 'localhost').replace(/^['"]|['"]$/g, '').trim();
    this.connection = mysql.createConnection({
        host,
        port: parseInt(process.env.DB_PORT, 10) || 3306,
        user: (process.env.DB_USER || 'root').replace(/^['"]|['"]$/g, '').trim(),
        password: (process.env.DB_PASSWORD || '').replace(/^['"]|['"]$/g, '').trim(),
        database: (process.env.DB_NAME || 'cafe').replace(/^['"]|['"]$/g, '').trim(),
        dateStrings: true,
        connectTimeout: 15000
    });
  
    console.log('Connected to MySQL database');
    // executing connection
    this.connection.connect(err => {
      if (err) throw err;
      // Check if tables 'users' and 'reservations' exist
      let checkTableSql = `SELECT table_name, COUNT(*) as table_exists 
                            FROM information_schema.tables 
                            WHERE table_schema = 'cafe' 
                            AND table_name IN ('users', 'reservations', 'menuitems')
                            GROUP BY table_name`;
        this.connection.query(checkTableSql, (err, result) => {
        if (err) throw err;
                
        const existingTables = result.map(row => row.TABLE_NAME);
        const allTables = Object.keys(dbCommandsEnum.tables);
        allTables.forEach(tableName => {
          if (!existingTables.includes(tableName)) {   
            const createTableSql = dbCommandsEnum.tables[tableName]();
            this.connection.query(createTableSql, (err, result) => {
              if (err) throw err;
            });
            if(tableName === 'menuitems' ) {
              const populateTableSql = dbCommandsEnum['populateMenuItems']();
              this.connection.query(populateTableSql[0],populateTableSql[1], (err, result) => {
                if (err) throw err;
              });
            }
          }
        });
      });
    });
  }
}


module.exports = new SqlDb();