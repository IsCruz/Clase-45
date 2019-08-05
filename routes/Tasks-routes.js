const express = require('express');
const router = express.Router();
const tasksController = require('../app/api/controllers/Tasks');

router.get('/', tasksController.getAllTasks);
router.post('/add', tasksController.addTasks);
router.post('/update/:id', tasksController.updateTasks);
router.post('/delete', tasksController.deleteTasks)

module.exports = router;