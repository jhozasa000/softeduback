require('dotenv').config();
// libreria mysql
var mySQL = require('mysql');

// variables de conexion
const hostname = process.env.DB_HOST;
const database = process.env.DB_DATABASE;
const user = process.env.DB_USER;
const pass = process.env.DB_PASSWORD;
  

// crear conexion
var pool  = mySQL.createPool({
    host: hostname,
    user: user,
    password: pass,
    database: database
});
module.exports = pool;