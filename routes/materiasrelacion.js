//plantilla nodejs

var express = require('express');
var router = express.Router();
const pool = require('../database/db')

/* insertar materiasrelacion */
router.post('/insert', function (req, res) {
    pool.getConnection(function (err, connection) {
      const data = req.body;

        connection.query(  `INSERT INTO materiasrelacion(idm,idg,idd) VALUES(${data.idm},${data.idg},${data.idd}) ` , function (err, rows) {
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
        connection.query(`SELECT id, idm,idg,idd FROM materiasrelacion WHERE idm = ${req.body.idm} AND idg = ${req.body.idg}  AND idd = ${req.body.idd}   ` , function (err, rows) {
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
        connection.query(`SELECT rel.id id, idm,idg,idd,mat.name namemat,gra.name namegra,doc.name namedoc,doc.numberid, pro.name namepro, cal.name namecal, jor.name namejor FROM materiasrelacion rel INNER JOIN materias mat ON rel.idm = mat.id INNER JOIN grados gra ON rel.idg = gra.id INNER JOIN docentes doc ON rel.idd = doc.id INNER JOIN profesion pro ON doc.profession = pro.id  INNER JOIN calendario cal ON gra.idcal = cal.id INNER JOIN jornada jor ON gra.idjor = jor.id WHERE rel.state = 1` , function (err, rows) {
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
      connection.query(`UPDATE materiasrelacion SET state = 0 WHERE id= ${data.id}` , function (err, rows) {
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

    console.log('data edit  ', data);

    pool.getConnection(function (err, connection) {
      connection.query(`UPDATE materiasrelacion SET idm = ${data.idm}, idg = ${data.idg}, idd = ${data.idd} WHERE id= ${data.id}` , function (err, rows) {
          connection.release();


          console.log('err  ::  ', err);

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