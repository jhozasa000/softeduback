// variables de enrutamiento
var express = require('express');
var router = express.Router();
//variable de la base de datos
const pool = require('../database/db')
// variable global se carga
require('dotenv').config();
// libreria para generar pdf
const puppeteer = require('puppeteer');
const outputPath = process.env.URL_FILES

//  enrutamiento validar estudiante
router.post('/select', function (req, res) {
    pool.getConnection(function (err, connection) {
        connection.query(`SELECT estu.id,estu.name,estu.lastname,DATE_FORMAT(estu.datebirth, "%Y-%m-%d") datebirth,estu.numberid,estu.email,estu.telephone, tip.name nametip, gra.name namegra, cal.name namecal, jor.name namejor FROM estudiantes estu  INNER JOIN estudiantesrelacion rel ON estu.id = rel.idstu INNER JOIN tipoidentificacion tip ON estu.typeid = tip.id INNER JOIN grados gra ON rel.idgra = gra.id INNER JOIN calendario cal ON gra.idcal = cal.id INNER JOIN jornada jor ON gra.idjor = jor.id WHERE estu.numberid = ${req.body.idnumber}   ` , function (err, rows) {
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

//  enrutamiento pasar datos para generar pdf
router.post('/report',function(req,res){
    const html = req.body.htmlpdf
    exportWebsiteAsPdf(html)
    res.send(JSON.stringify(`reporte.pdf`));
})

//  funcion que genera el pdf y lo guarda
async function exportWebsiteAsPdf(html) {
    // Create a browser instance
    const browser = await puppeteer.launch({
      headless: 'new'
    });

    // Create a new page
    const page = await browser.newPage();

    await page.setContent(html, { waitUntil: 'domcontentloaded' });

    // To reflect CSS used for screens instead of print
    await page.emulateMediaType('screen');

    // Download the PDF
    const PDF = await page.pdf({
      path: `${outputPath}reporte.pdf`,
      margin: { top: '100px', right: '50px', bottom: '100px', left: '50px' },
      printBackground: true,
      format: 'A4',
    });

    // Close the browser instance
    await browser.close();

    return PDF;
  }



module.exports = router;