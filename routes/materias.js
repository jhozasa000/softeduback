//plantilla nodejs

// variables de enrutamiento
var express = require('express');
var router = express.Router();
//variable de la base de datos
const pool = require('../database/db')

/* insertar materias */
router.post('/insert', function (req, res) {
    pool.getConnection(function (err, connection) {
      const data = req.body;

        connection.query(  `INSERT INTO materias(name) VALUES('${data.name}') ` , function (err, rows) {
            connection.release();
            if(err){
            const er = {
              error:'Validar datos ingresados'
            }
            res.send(JSON.stringify(er));
          }else{
            res.send(JSON.stringify(rows));
          }      
        });
    });
  });

//  enrutamiento insertar materias
router.post('/select', function (req, res) {
    pool.getConnection(function (err, connection) {
        connection.query(`SELECT id, name FROM materias WHERE name = '${req.body.name} ' ` , function (err, rows) {
            connection.release();
            if(err){
            const er = {
              error:'Validar datos ingresados'
            }
            res.send(JSON.stringify(er));
          }else{
            res.send(JSON.stringify(rows));
          }      
        });
    });
});


//  enrutamiento capturar materias
router.get('/select', function (req, res) {
    pool.getConnection(function (err, connection) {
        connection.query(`SELECT id, name FROM materias WHERE state = 1` , function (err, rows) {
            connection.release();
            if(err){
            const er = {
              error:'Validar datos ingresados'
            }
            res.send(JSON.stringify(er));
          }else{
            res.send(JSON.stringify(rows));
          }      
        });
    });
  });

//  enrutamiento cambiar estado materias
  router.put('/delete', function(req, res) {
    const data = req.body;
    pool.getConnection(function (err, connection) {
      connection.query(`UPDATE materias SET state = 0 WHERE id= ${data.id}` , function (err, rows) {
          connection.release();
          if(err){
            const er = {
              error:'Validar datos ingresados'
            }
            res.send(JSON.stringify(er));
          }else{
            res.send(JSON.stringify(rows));
          }      
        });
    });
  
  });
  
//  enrutamiento editar materia 
  router.put('/edit', function(req, res) {
    const data = req.body;
    pool.getConnection(function (err, connection) {
      connection.query(`UPDATE materias SET name = '${data.name}' WHERE id= ${data.id}` , function (err, rows) {
          connection.release();
          if(err){
            const er = {
              error:'Validar datos ingresados'
            }
            res.send(JSON.stringify(er));
          }else{
            res.send(JSON.stringify(rows));
          }      
        });
    });
  
  });
  
  module.exports = router;