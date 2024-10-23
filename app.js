var createError = require('http-errors');
var express = require('express');
const mongoose = require('mongoose');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

// Connessione a MongoDB 
const mongoURI = 'mongodb://127.0.0.1:27017/express-file-upload';
const conn = mongoose.createConnection(mongoURI);

// Definisci le opzioni per swagger-jsdoc
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0', // Usa la versione OpenAPI 3.0
    info: {
      title: 'API di esempio',
      version: '1.0.0',
      description: 'Documentazione della API con Swagger',
      contact: {
        name: 'Il tuo nome',
      },
      servers: [
        {
          url: 'http://localhost:3030', // Indirizzo base del server
        },
      ],
    },
  },
  apis: ['./routes/*.js'], // Percorso ai file che contengono la documentazione API
};


// Inizializza swagger-jsdoc
const swaggerDocs = swaggerJsDoc(swaggerOptions);

// Imposta la rotta per la UI di Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

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




// Avvia il server
const PORT = process.env.PORT || 3030;
app.listen(PORT, () => {
  console.log(`Server avviato su http://localhost:${PORT}`);
  console.log(`Swagger docs disponibili su http://localhost:${PORT}/api-docs`);
});





module.exports = app;
