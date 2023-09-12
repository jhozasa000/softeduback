//plantilla nodejs

var express = require('express');
var router = express.Router();
const pool = require('../database/db')


router.get('/select', function (req, res) {
    pool.getConnection(function (err, connection) {
        connection.query(`SELECT id , name FROM tipoidentificacion WHERE state = 1` , function (err, rows) {
            connection.release();
            res.send(JSON.stringify(rows));
        });
    });
  });

  
  module.exports = router;