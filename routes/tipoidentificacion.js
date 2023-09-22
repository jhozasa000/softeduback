//plantilla nodejs

// variables de enrutamiento
var express = require('express');
var router = express.Router();
//variable de la base de datos
const pool = require('../database/db')

// enrutamienta para capturar el tipo de identificacion
router.get('/select', function (req, res) {
    pool.getConnection(function (err, connection) {
        connection.query(`SELECT id , name FROM tipoidentificacion WHERE state = 1` , function (err, rows) {
            connection.release();
            res.send(JSON.stringify(rows));
        });
    });
  });

  
  module.exports = router;