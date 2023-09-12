require('dotenv').config();
var mySQL = require('mysql');

const hostname = process.env.DB_HOST;
const database = process.env.DB_DATABASE;
const user = process.env.DB_USER;
const pass = process.env.DB_PASSWORD;
  


var pool  = mySQL.createPool({
    host: hostname,
    user: user,
    password: pass,
    database: database
});
module.exports = pool;