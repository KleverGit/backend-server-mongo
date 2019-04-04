var express = require('express');
var app = express();
// Rutas 
app.get('/', (request, response, next) => {
    response.status(200).json({
        status: 'success',
        message: 'Peticion realizada con exito'
    });
})
module.exports = app;