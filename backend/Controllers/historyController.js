const History = require("../Models/historyModel");
const Project = require("../Models/projectModel");


//Get All Projects Histories API
const GetAllProjectsHistories = async(req,res)=>{
    const projects = await Project.find({}).populate('Histories')
    return res.json(projects.map(project=>project.Histories))
}

//Get All Histories API
const GetAllHistories = async(req,res)=>{
    const histories = await History.find().populate('Users').populate('Task').populate('Project')
    console.log(histories)
    return res.json(histories)
}


module.exports = {GetAllProjectsHistories,GetAllHistories}