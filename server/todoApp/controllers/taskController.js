const task = require('../model/taskModel');
const catchAsync = require('../utils/catchAsync');

exports.createTask = catchAsync( async (req,res,next) => {
    const newTask = await task.create({
        taskName: req.body.taskName,
        stateTask: req.body.stateTask,
        tag:req.body.tag,
        user: req.body.user
    })
    res.status(201).json({
        status: 'succès',
        data:{
            newTask
        }
    })
});

exports.getAllTask = catchAsync( async (req,res,next) => {
    const tasks = await task.find().populate('user');
    res.status(200).json({
        status: 'succès',
        data:{
            tasks
        }
    })
});
exports.getTask = catchAsync(async (req,res,next) => {
    const user = await task.findById(req.params.id).populate('user');
    if(!user) return "cet Id ne correspond à aucun utlisateur";
    res.status(200).json({
        status: "succès",
        data: {
            user
        }
    })
});

exports.updateTask = catchAsync(async (req,res,next) => {
    const updateTask = await task.findByIdAndUpdate(req.params.id, req.body,{
        new: true,
        runValidators: true
    })
    if (!updateTask) return "pas de tâche trouvé avec cet id"
    res.status(201).json({
        status: "succès",
        data: {
            updateTask
        }
    })
});

exports.deleteTask = catchAsync(async (req,res,next) => {
   const deleteTask = await task.findByIdAndDelete(req.params.id);
    if(!deleteTask) return "l'id est incorrect";
    res.status(201).json({
        status: "succès",
        data: null
    })
});