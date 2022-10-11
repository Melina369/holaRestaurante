const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
    nombre: String,
    apellido: String,
    edad: Number ,
    dni: String,
    trabajo: String,
    sueldo: Number,
    telefono: String,
    direccion: String
});

//Lo guardo en una colección
module.exports= mongoose.model('Empleados', TaskSchema);