//plantilla nodejs

var express = require('express');
var router = express.Router();
const pool = require('../database/db')


/* insertar estudiantesrelacion */
router.post('/insert', function (req, res) {
    pool.getConnection(function (err, connection) {
      const data = req.body;

        connection.query(  `INSERT INTO estudiantesrelacion(idstu,idgra) VALUES(${data.idstu},${data.idgra}) ` , function (err, rows) {
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
        connection.query(`SELECT id FROM estudiantesrelacion WHERE idstu = ${req.body.idstu}  AND idgra = ${req.body.idgra} ` , function (err, rows) {
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
        connection.query(`SELECT sturel.id,idstu,idgra, stu.name,stu.lastname,stu.numberid , gra.name namegra, cal.name namecal, jor.name namejor FROM estudiantesrelacion sturel INNER JOIN estudiantes stu ON sturel.idstu = stu.id INNER JOIN grados gra ON sturel.idgra = gra.id INNER JOIN calendario cal ON gra.idcal = cal.id INNER JOIN jornada jor ON gra.idjor = jor.id WHERE sturel.state = 1` , function (err, rows) {
            connection.release();
            if(err){
            const er = {
              error:'Validar datos ingresados '
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
      connection.query(`UPDATE estudiantesrelacion SET state = 0 WHERE id= ${data.id}` , function (err, rows) {
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
      connection.query(`UPDATE estudiantesrelacion SET  idstu = ${req.body.idstu}, idgra = ${req.body.idgra} WHERE id= ${data.id}` , function (err, rows) {
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