//Es el punto de entrada de la  app
// Es el archivo principal de la app backend
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser')

// iniciaer variable de express
var app = express();

// Body parser
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// importar rutas 
// NO hace falta poner la extension js por estamos trabajando con archivos javascript
var appRoutes = require('./routes/app');
var usuarioRoutes = require('./routes/usuario');
var loginRoutes = require('./routes/login');

mongoose.connection.openUri('mongodb://localhost:27017/hospitalDB', (err, resp) => {
    if (err) {
        throw err;
    }
    console.log(' **** Base de datos mongoDB \x1b[32m%s\x1b[0m ', 'online ****');
});

// Middleware rutas
app.use('/usuario', usuarioRoutes);
app.use('/login', loginRoutes);
app.use('/', appRoutes);

// Escuchar peticiones
app.listen(3000, () => {
    console.log('server listen on port 3000')
})
