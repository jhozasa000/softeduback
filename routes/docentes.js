//variable de la libreria para subir archivos
const multer = require('multer');
// variables de enrutamiento
var express = require('express');
var router = express.Router();
//variable de la base de datos
const pool = require('../database/db')
//carga de varibales globales
require('dotenv').config();
const outputPath = process.env.URL_FILES_TEACHERS

// funcion para redireccionar el archivo y el nombre
const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
   // cb(null, "./public/files");
    cb(null, outputPath);
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    cb(null, `teacherfile-${file.fieldname}-${Date.now()}.${ext}`);
  },
});

const upload = multer({
  storage: multerStorage,
});


/* insertar docentes */
router.post('/insert',upload.single('files'), function (req, res) {
    pool.getConnection(function (err, connection) {
      const data = req.body;
       connection.query(  `INSERT INTO docentes(name,numberid,profession,telephone,address,files) VALUES('${data.name}',${data.numberid},${data.profession},${data.telephone},'${data.address}','${req?.file?.filename??''}') ` , function (err, rows) {
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

  //  enrutamiento validar docente 
router.post('/select', function (req, res) {
    pool.getConnection(function (err, connection) {
        connection.query(`SELECT numberid FROM docentes WHERE numberid = ${req.body.numberid}` , function (err, rows) {
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

//  enrutamiento capturar docentes
router.get('/select', function (req, res) {
    pool.getConnection(function (err, connection) {
        connection.query(`SELECT doc.id id,doc.name,doc.numberid,pro.name profession,pro.id idpro,doc.telephone,doc.address,doc.files FROM  docentes doc INNER JOIN profesion pro ON doc.profession = pro.id WHERE doc.STATE = 1` , function (err, rows) {
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

//  enrutamiento estado docente
  router.put('/delete', function(req, res) {
    const data = req.body;
    pool.getConnection(function (err, connection) {
      connection.query(`UPDATE docentes SET state = 0 WHERE id= ${data.id}` , function (err, rows) {
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

  //  enrutamiento editar docente
  router.put('/edit',upload.single('files'), function(req, res) {
    const data = req.body;
    let imgNew = req?.file?.filename??data.filesbd
    pool.getConnection(function (err, connection) {
      connection.query(`UPDATE docentes SET name = '${data.name}',profession = ${data.profession},telephone = ${data.telephone},address = '${data.address}',files = '${imgNew}' WHERE id= ${data.id}` , function (err, rows) {
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