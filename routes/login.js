var express = require('express');
var bcrytp = require('bcryptjs');
var app = express();
var Usuario = require('../models/usuario');
var jwt = require('jsonwebtoken');
var SEED = require('../config/config').SEED;

/**
 * Request POST
 */
app.post('/', (request, response, next) => {
    var body = request.body;
    Usuario.findOne({ email: body.email }, (err, usuarioFind) => {
        if (err) {
            return response.status(500).json({
                status: 'failed',
                message: 'Error encontrar usuario',
                errors: err
            });
        }
        if (!usuarioFind) {
            return response.status(400).json({
                status: 'failed',
                message: 'Credenciales incorrectas - email',
                errors: { message: 'No existe usuario con el email dado' }
            });
        }

        if (!bcrytp.compareSync(body.password, usuarioFind.password)) {
            return response.status(400).json({
                status: 'failed',
                message: 'Credenciales incorrectas - password',
                errors: { message: 'Password incorrecto' }
            });
        }


        // Genera un token con jwt
        // la libreria jwt recibe tres paramentros 
        // 1. payload = objeto a generar token
        // 2. seed = string cualquiera seed significa semilla ejemplo de seed = @seed puede ser cualquier string
        // 3. tiempo de expiracion 14000 es 4 horas
        var token = jwt.sign({ usuario: usuarioFind }, SEED, { expiresIn: '14000000' });

        // asigna un password cualquiera
        usuarioFind.password = '.|.';


        response.status(200).json({
            status: 'success',
            object: usuarioFind,
            token: token
        });

    });
});

module.exports = app;