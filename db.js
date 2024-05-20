const mysql = require('mysql2');
require("dotenv").config()


//config connection to db:
const pool = mysql.createPool({
    host: process.env.HOST,
    database: process.env.DATABASE,
    user: process.env.USER,
    password: process.env.PASSWORD,
    port: process.env.MYSQL_PORT,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Use pool.promise() to use async/await with the pool
// const poolPromise = pool.promise();

//check connection:
if (pool) {
    console.log("Connected to MySQL DB!");
}
else {
    console.error("Cannot connect to DB!");
};

// Export connected client 
const conn = pool;
module.exports = { conn };