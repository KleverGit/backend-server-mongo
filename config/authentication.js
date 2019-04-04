var jwt = require('jsonwebtoken');
var SEED = require('../config/config').SEED;

// Verificar token 
// Verificar si es valido y si no expira
// va justo en esta line porque de aqui en adelante se van a validar los servicios con token
exports.verificarToken = function (request, response, next) {
    // request.query es cuando se manda parametros ?
    var token = request.query.token;
    // Verifica el token dado
    console.log('token ******', token);
    jwt.verify(token, SEED, (err, decoded) => {
        if (err) {
            return response.status(401).json({
                status: 'failed',
                message: 'Error de autenticación token invalido',
                errors: err
            });
        }
        // manda a la siguiente linea
        // se guarda en el request el usuario que viene del decode
        request.usuarioToken = decoded.usuario;
        next();
    });
}
