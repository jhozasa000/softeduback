// variables de enrutamiento
var express = require('express');
var router = express.Router();
//variable de la base de datos
const pool = require('../database/db')

//  enrutamiento validar usuario inicio de sesion
router.post('/', function (req, res) {
  pool.getConnection(function (err, connection) {
      connection.query(`SELECT user,id,level FROM login WHERE user = '${req.body.user}'  and pass='${req.body.pass}' and state = 1` , function (err, rows) {
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
