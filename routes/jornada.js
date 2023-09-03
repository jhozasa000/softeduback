var express = require('express');
var router = express.Router();
var mysql = require('mysql');
require('dotenv').config();
const multer = require('multer');

const hostname = process.env.DB_HOST;
const database = process.env.DB_DATABASE;
const user = process.env.DB_USER;
const pass = process.env.DB_PASSWORD;
  
// se crea la conexion 
var pool        = mysql.createPool({
  connectionLimit : 10, // default = 10
  host            : hostname,
  user            : user,
  password        : pass,
  database        : database
});

/* insertar jornada */
router.post('/insert', function (req, res) {
    pool.getConnection(function (err, connection) {
      const data = req.body;

        connection.query(  `INSERT INTO jornada(name) VALUES('${data.name}') ` , function (err, rows) {
            connection.release();
            if (err) throw err;
            res.send(JSON.stringify(rows));
        });
    });
  });

router.post('/select', function (req, res) {
    pool.getConnection(function (err, connection) {
        connection.query(`SELECT id, name FROM jornada WHERE state = 1 and name = '${req.body.name} ' ` , function (err, rows) {
            connection.release();
            if (err) throw err;
            res.send(JSON.stringify(rows));
        });
    });
});

router.get('/select', function (req, res) {
    pool.getConnection(function (err, connection) {
        connection.query(`SELECT id, name FROM jornada WHERE state = 1` , function (err, rows) {
            connection.release();
            if (err) throw err;
            res.send(JSON.stringify(rows));
        });
    });
  });


  router.put('/delete', function(req, res) {
    const data = req.body;
    pool.getConnection(function (err, connection) {
      connection.query(`UPDATE jornada SET state = 0 WHERE id= ${data.id}` , function (err, rows) {
          connection.release();
          if (err) throw err;
          res.send(JSON.stringify(rows));
        });
    });
  
  });

  router.put('/edit', function(req, res) {
    const data = req.body;
    pool.getConnection(function (err, connection) {
      connection.query(`UPDATE jornada SET name = ${data.name} WHERE id= ${data.id}` , function (err, rows) {
          connection.release();
          if (err) throw err;
          res.send(JSON.stringify(rows));
        });
    });
  
  });
  
  module.exports = router;