const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
    title: String,
    description: String,
    status: {
        type: Boolean,
        default: false
    }
});

//Lo guardo en una colección
module.exports= mongoose.model('tasks', TaskSchema);