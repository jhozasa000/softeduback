//plantilla nodejs

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


/* insertar docentes */
router.post('/insert', function (req, res) {
    pool.getConnection(function (err, connection) {
      const data = req.body;

        connection.query(  `INSERT INTO docentes(name,numberid,profession,telephone,address,files) VALUES('${data.name}',${data.numberid},${data.profession},${data.telephone},'${data.address}','${data.files}') ` , function (err, rows) {
            connection.release();
            if (err) throw err;
            res.send(JSON.stringify(rows));
        });
    });
  });

router.post('/select', function (req, res) {
    pool.getConnection(function (err, connection) {
        connection.query(`SELECT numberid FROM docentes WHERE numberid = '${req.body.numberid} ' ` , function (err, rows) {
            connection.release();
            if (err) throw err;
            res.send(JSON.stringify(rows));
        });
    });
});

router.get('/select', function (req, res) {
    pool.getConnection(function (err, connection) {
        connection.query(`SELECT name,numberid,profession,telephone,address,files FROM docentes WHERE state = 1` , function (err, rows) {
            connection.release();
            if (err) throw err;
            res.send(JSON.stringify(rows));
        });
    });
  });


  router.put('/delete', function(req, res) {
    const data = req.body;
    pool.getConnection(function (err, connection) {
      connection.query(`UPDATE docentes SET state = 0 WHERE id= ${data.id}` , function (err, rows) {
          connection.release();
          if (err) throw err;
          res.send(JSON.stringify(rows));
        });
    });
  
  });

  router.put('/edit', function(req, res) {
    const data = req.body;
    pool.getConnection(function (err, connection) {
      connection.query(`UPDATE docentes SET name = '${data.name}',numberid = ${data.numberid},profession = ${data.profession},telephone = ${data.telephone},address = '${data.address}',files = '${data.files}' WHERE id= ${data.id}` , function (err, rows) {
          connection.release();
          if (err) throw err;
          res.send(JSON.stringify(rows));
        });
    });
  
  });
  
  module.exports = router;