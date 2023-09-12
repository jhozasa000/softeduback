//plantilla nodejs

var express = require('express');
var router = express.Router();
const pool = require('../database/db')

/* insertar estudiantes */
router.post('/insert', function (req, res) {
    pool.getConnection(function (err, connection) {
      const data = req.body;
        connection.query(  `INSERT INTO estudiantes(name,lastname,typeid,numberid,datebirth,telephone,email) VALUES('${data.name}','${data.lastname}',${data.typeid},${data.numberid},'${data.datebirth}',${data.telephone},'${data.email}'   ) ` , function (err, rows) {
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

router.post('/select', function (req, res) {
    pool.getConnection(function (err, connection) {
        connection.query(`SELECT id FROM estudiantes WHERE numberid = ${req.body.numberid} ` , function (err, rows) {
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

router.get('/select', function (req, res) {
    pool.getConnection(function (err, connection) {
        connection.query(`SELECT est.id,est.name,est.lastname,est.typeid,est.numberid,DATE_FORMAT(est.datebirth, "%Y-%m-%d") datebirth,est.telephone,est.email,tip.name nametipo FROM estudiantes est INNER JOIN tipoidentificacion tip ON est.typeid = tip.id WHERE est.state = 1` , function (err, rows) {
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


  router.put('/delete', function(req, res) {
    const data = req.body;
    pool.getConnection(function (err, connection) {
      connection.query(`UPDATE estudiantes SET state = 0 WHERE id= ${data.id}` , function (err, rows) {
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

  router.put('/edit', function(req, res) {
    const data = req.body;
    pool.getConnection(function (err, connection) {
      connection.query(`UPDATE estudiantes SET name = '${data.name}', lastname = '${data.lastname}', typeid = '${data.typeid}' , numberid = ${data.numberid},
      datebirth = '${data.datebirth}', telephone = ${data.telephone}, email = '${data.email}'     WHERE id= ${data.id}` , function (err, rows) {
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