const express = require("express")
const {AddProject, GetAllProjects, CloseProject, EditProject} = require("../Controllers/projectController")


const router = express.Router()

router.get('/getAllProjects',GetAllProjects)
router.post('/addProject',AddProject)
router.put('/closeProject/:id',CloseProject)
router.put('/editProject/:id',EditProject)

module.exports = router