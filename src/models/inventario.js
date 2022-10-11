const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const InventarioSchema = new Schema({
    nombre: String,
    marca: String,
    precio: Number,
    status: {
        type: Boolean,
        default: false
    },
    problemas: String
});

//Lo guardo en una colección
module.exports= mongoose.model('inventario', InventarioSchema);