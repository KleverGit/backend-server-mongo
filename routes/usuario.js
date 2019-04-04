var express = require('express');
var bcrytp = require('bcryptjs');
var middlewareAuthentication = require('../config/authentication');
var app = express();
var Usuario = require('../models/usuario');


/**
 * Requests GET
 */
app.get('/', (request, response, next) => {
    Usuario.find({}, 'nombre email img role').exec(
        (err, usuarios) => {
            if (err) {
                response.status(500).json({
                    status: 'failed',
                    message: 'Error al obtener usuarios',
                    errors: err
                });
            }
            response.status(200).json({
                status: 'success',
                message: 'Usuarios encontrados',
                object: usuarios
            });
        });

});


/**
 * Request POST
 */
app.post('/', middlewareAuthentication.verificarToken, (request, response, next) => {
    var body = request.body;
    var usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrytp.hashSync(body.password, 10),
        img: body.img,
        role: body.role
    });
    usuario.save((err, usuarioSave) => {
        if (err) {
            response.status(400).json({
                status: 'failed',
                message: 'Error al guardar usuarios',
                errors: err
            });
        }
        response.status(201).json({
            status: 'success',
            object: usuarioSave
        });
    });
});


/**
 * Request PUT
 */
app.put('/:id', middlewareAuthentication.verificarToken, (request, response, next) => {
    var id = request.params.id;
    var body = request.body;

    Usuario.findById(id, (err, usuario) => {
        if (err) {
            return response.status(500).json({
                status: 'failed',
                message: 'Error encontrar usuario',
                errors: err
            });
        }
        if (!usuario) {
            return response.status(500).json({
                status: 'failed',
                message: 'Error encontrar usuario con id' + id,
                errors: { message: 'No existe usuario con el id dado' }
            });
        }

        usuario.nombre = body.nombre;
        usuario.email = body.email;
        usuario.role = body.role;
        usuario.save((err, usuarioUpdate) => {
            if (err) {
                response.status(400).json({
                    status: 'failed',
                    message: 'Error al actualizar usuarios',
                    errors: err
                });
            }
            response.status(200).json({
                status: 'success',
                object: usuarioUpdate
            });
        });

    })

});

/**
 * Borrar usuario DELETE
 */
app.delete('/:id', middlewareAuthentication.verificarToken, (request, response, nest) => {
    var id = request.params.id;
    Usuario.findByIdAndRemove(id, (err, usuarioDeleted) => {
        if (err) {
            return response.status(500).json({
                status: 'failed',
                message: 'Error usuario no encontrado',
                errors: err
            });
        }

        if (!usuarioDeleted) {
            return response.status(500).json({
                status: 'failed',
                message: 'Error encontrar usuario con id' + id,
                errors: { message: 'No existe usuario con el id dado' }
            });
        }

        response.status(200).json({
            status: 'success',
            message: 'Usuario borrado con id ' + id,
            object: usuarioDeleted
        });
    })
});

module.exports = app;