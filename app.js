//Es el punto de entrada de la  app
// Es el archivo principal de la app backend
var express = require('express');
var mongoose = require('mongoose');

// iniciaer variable de express
var app = express();

mongoose.connection.openUri('mongodb://localhost:27017/hospitalDB', (err, resp)=>{
    if (err){
        throw err;
    }

    console.log('Base de datos  \x1b[32m%s\x1b[0m ', 'online');
});

// Rutas 
app.get('/', (request, response, next) => {
    response.status(200).json({
        status: 'success',
        message: 'Peticion realizada con exito'
    });
})



// Escuchar peticiones
app.listen(3000, () => {
    console.log('server listen on port 3000')
})
