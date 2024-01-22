const express = require("express");
const taskController = require('../controllers/taskController')
const router = express.Router();

router.post('/task',taskController.createTask);
router.get('/task',taskController.getAllTask);
router.delete('/:id', taskController.deleteTask);
router.patch('/:id', taskController.updateTask);
router.get('/:id', taskController.getTask);


module.exports = router;