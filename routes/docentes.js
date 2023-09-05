//plantilla nodejs

var express = require('express');
var router = express.Router();
var mysql = require('mysql');
require('dotenv').config();
const multer = require('multer');

const hostname = process.env.DB_HOST;
const database = process.env.DB_DATABASE;
const user = process.env.DB_USER;
const pass = process.env.DB_PASSWORD;
  
// se crea la conexion 
var pool        = mysql.createPool({
  connectionLimit : 10, // default = 10
  host            : hostname,
  user            : user,
  password        : pass,
  database        : database
});

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
   // cb(null, "./public/files");
    cb(null, "/Users/jhonnatanzapata/React/softeduapp/public/assets/files");
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