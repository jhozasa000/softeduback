//plantilla nodejs

var express = require('express');
var router = express.Router();
const pool = require('../database/db')

/* insertar grados */
router.post('/insert', function (req, res) {
    pool.getConnection(function (err, connection) {
      const data = req.body;

        connection.query(`INSERT INTO grados(name,idcal,idjor) VALUES('${data.name}',${data.idcal},${data.idjor}) ` , function (err, rows) {
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
      const data = req.body;
        connection.query(`SELECT id FROM grados WHERE name = '${data.name}' AND idcal = ${data.idcal} AND idjor = ${data.idjor} ` , function (err, rows) {
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
        connection.query(`SELECT gra.id idgra, gra.name namegra, gra.idcal idcal, gra.idjor idjor, cal.name namecal, jor.name namejor FROM grados gra INNER JOIN calendario cal ON gra.idcal = cal.id INNER JOIN jornada jor ON gra.idjor = jor.id WHERE gra.state = 1` , function (err, rows) {
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
      connection.query(`UPDATE grados SET state = 0 WHERE id= ${data.id}` , function (err, rows) {
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
      connection.query(`UPDATE grados SET name = '${data.name}', idcal = ${data.idcal}, idjor = ${data.idjor} WHERE id= ${data.id}` , function (err, rows) {
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