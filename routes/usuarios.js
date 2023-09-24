//plantilla nodejs

// variables de enrutamiento
var express = require('express');
var router = express.Router();
//variable de la base de datos
const pool = require('../database/db')


//  enrutamiento insertar login 
router.post('/insert', function (req, res) {
    pool.getConnection(function (err, connection) {
      const data = req.body;

        connection.query(  `INSERT INTO login(user,pass,level) VALUES('${data.datauser}','${data.datapass}',1) ` , function (err, rows) {
            connection.release();

            // se valida si hay error
            if(err){
            const er = {
              error:'Validar datos ingresados'
            }
            res.send(JSON.stringify(er));
          }else{
            // se envia la data capturada de la base de datos
            res.send(JSON.stringify(rows));
          }      
        });
    });
  });

  //  enrutamiento validar usuario
router.post('/select', function (req, res) {
    pool.getConnection(function (err, connection) {
        connection.query(`SELECT id FROM login WHERE user = '${req.body.datauser}' ` , function (err, rows) {
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

//  enrutamiento validar usuario si existe en otro registro
router.post('/selectedit', function (req, res) {
  pool.getConnection(function (err, connection) {
      connection.query(`SELECT user FROM login WHERE EXISTS (SELECT user FROM login WHERE user = '${req.body.datauser}' and id != ${req.body.id} )  ` , function (err, rows) {
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

//  enrutamiento capturar usuarios
router.get('/select', function (req, res) {
    pool.getConnection(function (err, connection) {
        connection.query(`SELECT id,user name,pass FROM login WHERE state = 1` , function (err, rows) {
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

//  enrutamiento cambiar estado usuario
  router.put('/delete', function(req, res) {
    const data = req.body;
    pool.getConnection(function (err, connection) {
      connection.query(`UPDATE login SET state = 0 WHERE id= ${data.id}` , function (err, rows) {
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

  //  enrutamiento editar usuario
  router.put('/edit', function(req, res) {
    const data = req.body;
    pool.getConnection(function (err, connection) {
      connection.query(`UPDATE login SET  user = '${req.body.datauser}', pass = '${req.body.datapass}' WHERE id= ${req.body.id}` , function (err, rows) {
          connection.release();
          console.log('err  ', err);
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