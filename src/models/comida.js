const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ComidaSchema = new Schema({
    nombre: String,
    precio: Number,
    tipo: String
  
});

//Lo guardo en una colección
module.exports= mongoose.model('comidas', ComidaSchema);