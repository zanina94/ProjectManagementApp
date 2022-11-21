const express = require("express")
const {AddTask, GetAllTasks, EditTask, DeleteTask} = require("../Controllers/taskController")


const router = express.Router()

router.get('/getAllTasks',GetAllTasks)
router.post('/addTask',AddTask)
router.put('/editTask/:id',EditTask)
router.delete('/deleteTask/:id',DeleteTask)

module.exports = router