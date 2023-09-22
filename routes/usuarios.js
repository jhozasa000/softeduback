//plantilla nodejs

var express = require('express');
var router = express.Router();
const pool = require('../database/db')


/* insertar login */
router.post('/insert', function (req, res) {
    pool.getConnection(function (err, connection) {
      const data = req.body;

        connection.query(  `INSERT INTO login(user,pass,level) VALUES('${data.datauser}','${data.datapass}',1) ` , function (err, rows) {
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

router.post('/selectedit', function (req, res) {
  pool.getConnection(function (err, connection) {
      connection.query(`SELECT user FROM login WHERE EXISTS (SELECT user FROM login WHERE user = '${req.body.datauser}' and id != '${req.body.id}' )  ` , function (err, rows) {
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