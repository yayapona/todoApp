const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    taskName: {
        type: String,
        require: [true, "veuillez saisir le nom de la tache"]
    },
    stateTask: {
        type:String,
        require:[true,"veuillez saisir l'etat de la tâche"],
    },
    tag: {
        type:String,
        require: [true, "veuillez saisir la catégorie de la tâche"]
    },
    user: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'User'
        }
    ]
});

const Task = mongoose.model('Task', taskSchema);
module.exports = Task