//se cargan las librerias 
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors'); 

// se declaran las rutas
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loginRouter = require('./routes/login');
var calendarRouter = require('./routes/calendario');
var jornadaRouter = require('./routes/jornada');
var docentesRouter = require('./routes/docentes');
var profesionRouter = require('./routes/profesion');
var gradosRouter = require('./routes/grados');
var materiasRouter = require('./routes/materias');
var materiasrelacionRouter = require('./routes/materiasrelacion');
var tipoidentificacionRouter = require('./routes/tipoidentificacion');
var estudiantesRouter = require('./routes/estudiantes');
var estudiantesrelacionRouter = require('./routes/estudiantesrelacion');
var notasRouter = require('./routes/notas');
var reportesRouter = require('./routes/reportes');
var usuariosRouter = require('./routes/usuarios');
var anunciosRouter = require('./routes/anuncios');


var app = express();

// view engine setup

/*
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

*/

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors({
  origin: '*'
}));

// se declaran las rutas para poder ejecutarlas 
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/login', loginRouter);
app.use('/calendario', calendarRouter);
app.use('/jornada', jornadaRouter);
app.use('/docentes',docentesRouter)
app.use('/profesion',profesionRouter)
app.use('/grados',gradosRouter)
app.use('/materias',materiasRouter)
app.use('/materiasrelacion',materiasrelacionRouter)
app.use('/tipoidentificacion',tipoidentificacionRouter)
app.use('/estudiantes',estudiantesRouter)
app.use('/estudiantesrelacion',estudiantesrelacionRouter)
app.use('/notas',notasRouter)
app.use('/reportes',reportesRouter)
app.use('/usuarios',usuariosRouter)
app.use('/anuncios',anunciosRouter)


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
