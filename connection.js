const mysql = require('mysql2');
require ('dotenv').config();


var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: process.env.db_user,
    password: process.env.db_password,
    database: process.env.db_name,
})

module.exports = connection;