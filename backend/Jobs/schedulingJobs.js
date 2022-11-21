const cron = require('node-cron');
const Task = require("../Models/taskModel");
const Project = require("../Models/projectModel");


const UpdateTasksNumberOpenDays = async () => {
    try {
        const tasks = await Task.find({})
        tasks.forEach(async task => {
            if(task.IsOpen){
                const updatedTask = await Task.findByIdAndUpdate(task._id, { NumberDaysOpen : task.NumberDaysOpen +1 },{returnOriginal:false})
                console.log(updatedTask.NumberDaysOpen)
            }
        });
        console.log("Tasks are updating every day " + new Date())
    } catch (error) {
        console.error(`Error : ${error.message}`)
        process.exit(1)
    }
}


const UpdateProjectsStatuesByTasks = async () => {
    try {
        const projects = await Project.find({}).populate('Tasks')
        projects.forEach(async project => {
            const numTasksOpenThen3Days = (project.Tasks.filter(task => task.NumberDaysOpen >= 3)).length
            const numTasksOpenThen5Days = (project.Tasks.filter(task => task.NumberDaysOpen >= 5)).length
            const numTasksOpenThen10Days = (project.Tasks.filter(task => task.NumberDaysOpen >= 10)).length
            // console.log(project.Title+'=> 3days '+numTasksOpenThen3Days+' , 5days : ' + numTasksOpenThen5Days
            // +' , 10days : '+numTasksOpenThen10Days)
            if (numTasksOpenThen10Days >= 1 && numTasksOpenThen10Days <= 3)
            var updatedProject = await Project.findByIdAndUpdate(project._id, { Status : "Red" },{returnOriginal:false})
            else if (numTasksOpenThen5Days >= 1 && numTasksOpenThen5Days <= 3)
            var updatedProject = await Project.findByIdAndUpdate(project._id, { Status : "Yellow" },{returnOriginal:false})
            else if (numTasksOpenThen5Days >= 4)
            var updatedProject = await Project.findByIdAndUpdate(project._id, { Status : "Red" },{returnOriginal:false})
            else if (numTasksOpenThen3Days >= 5)
            var updatedProject = await Project.findByIdAndUpdate(project._id, { Status : "Yellow" },{returnOriginal:false})
            else
            var updatedProject = await Project.findByIdAndUpdate(project._id, { Status : "Green" },{returnOriginal:false})
             console.log(updatedProject.Title +" status is changed from "+ project.Status +" to "+ updatedProject.Status)
        });
        
    } catch (error) {
        console.error(`Error : ${error.message}`)
        process.exit(1)
    }
}

module.exports = {UpdateTasksNumberOpenDays,UpdateProjectsStatuesByTasks}

