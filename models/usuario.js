var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var Schema = mongoose.Schema;

var roles = {
    values: ['ADMIN', 'USER'],
    message: '{VALUE} no es un rol valido'
}
var usuarioSchema = new Schema({
    nombre: { type: String, required: [true, 'El nombre es necesario'] },
    email: { type: String, unique: true, required: [true, 'El nombre es necesario'] },
    password: { type: String, required: [true, 'El password es necesario'] },
    img: { type: String, required: false },
    role: { type: String, required: true, default: 'USER_ROLE', enum: roles }
});
usuarioSchema.plugin(uniqueValidator, { message: '{PATH} debe ser unico' });
module.exports = mongoose.model('Usuario', usuarioSchema);