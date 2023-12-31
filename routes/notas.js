//plantilla nodejs

// variables de enrutamiento
var express = require('express');
var router = express.Router();
//variable de la base de datos
const pool = require('../database/db')

/* insertar notas */
router.post('/insert', function (req, res) {
    pool.getConnection(function (err, connection) {
      const data = req.body;

        connection.query(  `INSERT INTO notas(idstu,subject,period,note) VALUES(${data.idstu},${data.subject},${data.period},${data.note}) ` , function (err, rows) {
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

//  enrutamiento capturar datos estudiantes
router.post('/select', function (req, res) {
    pool.getConnection(function (err, connection) {
        connection.query(`SELECT sturel.id,idstu,idgra, stu.name,stu.lastname,stu.numberid , gra.name namegra, cal.name namecal, jor.name namejor FROM estudiantesrelacion sturel INNER JOIN estudiantes stu ON sturel.idstu = stu.id INNER JOIN grados gra ON sturel.idgra = gra.id INNER JOIN calendario cal ON gra.idcal = cal.id INNER JOIN jornada jor ON gra.idjor = jor.id WHERE (stu.name LIKE '%${req.body.datafind}%' OR stu.lastname LIKE '%${req.body.datafind}%' OR CAST(stu.numberid as CHAR) LIKE '%${(req.body.datafind)}%')  AND sturel.state = 1  ORDER BY stu.name` , function (err, rows) {
            connection.release();
            res.send(JSON.stringify(rows));
        });
    });
});

//  enrutamiento capturar notas del estudiante
router.post('/findnotes', function (req, res) {
  pool.getConnection(function (err, connection) {
    let sql = `SELECT no.id,TRIM(no.note) note, no.subject , no.period, mat.name FROM notas no INNER JOIN materias mat ON no.subject = mat.id WHERE no.idstu = ${req.body.idstu} ORDER BY no.period ,mat.name  `;
    connection.query(sql, function(err, result) { 
    connection.release();
  // se declaran variables para generar el objecto para organizar las notas
      let nuevoArray    = []
      let arrayTemporal = []
      result.map(({id,note,period,subject,name},x) => {
          arrayTemporal = nuevoArray.filter(resp => resp.period == period && resp.subject == subject) 
              if(arrayTemporal.length>0){
                nuevoArray[nuevoArray.indexOf(arrayTemporal[0])]["notas"].push({id:id,num:note})
            }else{	
                nuevoArray.push({"name":name,  "period" : period ,"subject" : subject , "notas" : [{id:id,num:note}]})
            }
      })
      res.send(JSON.stringify(nuevoArray));
    });

  });
});

//  enrutamiento capturar materias
router.post('/findsignature', function (req, res) {
  pool.getConnection(function (err, connection) {
      connection.query(`SELECT mat.name, mat.id FROM materiasrelacion matrel INNER JOIN materias mat ON matrel.idm = mat.id WHERE matrel.idg = ${(req.body.idgra)} AND matrel.state = 1 AND mat.state = 1 GROUP BY mat.name,mat.id ` , function (err, rows) {
          connection.release();
          res.send(JSON.stringify(rows));
      });
  });
});


//enrutamiento notas para estadisticas
router.get('/loadnotescharts', function (req, res) {
  pool.getConnection(function (err, connection) {
      connection.query(`SELECT nota.id,nota.idstu,TRIM(nota.note) note, nota.subject , nota.period, mat.name FROM notas nota INNER JOIN materias mat ON nota.subject = mat.id ORDER BY nota.period ,mat.name ` , function (err, rows) {
          connection.release();
          let nuevoArray    = []
          let arrayTemporal = []
          rows.map(({id,note,period,subject,name,idstu},x) => {
              arrayTemporal = nuevoArray.filter(resp => resp.period == period && resp.subject == subject && resp.idstu == idstu) 
                  if(arrayTemporal.length>0){
                    nuevoArray[nuevoArray.indexOf(arrayTemporal[0])]["notas"].push({id:id,num:note})
                }else{	
                    nuevoArray.push({"idstu":idstu  ,"name":name,  "period" : period ,"subject" : subject , "notas" : [{id:id,num:note}]})
                }
          })
          res.send(JSON.stringify(nuevoArray));
      });
  });
});


//  enrutamiento editar notas 
  router.put('/edit', function(req, res) {
    pool.getConnection(function (err, connection) {
     const info = req.body.uptnotes
       let sql = ''
       info.map(({id,num},x) => {
           sql = `UPDATE notas SET note = ${num != '' ? num : 0} WHERE id= ${id} `;
           connection.query(sql, function(err, rows) { 
              
                if (err) {
                  const er = {
                    error:'Validar datos ingresados'
                  }
                  res.send(JSON.stringify(er));
                }else{
                  if(info.length-1 === x){
                    res.send(JSON.stringify(rows));
                  }
                }     
            });
        return 
        })
        connection.release();

    });
  
  });
  
  module.exports = router;