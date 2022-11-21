const Project = require("../Models/projectModel");
const Task = require("../Models/taskModel");
const User = require("../Models/userModel");
const History = require("../Models/historyModel")


//Get All Tasks API
const GetAllTasks = async(req,res)=>{
    const tasks = await Task.find({}).populate('Project').populate('Creator').populate('AssignedTo')
    return res.json(tasks)
}

//Add Task API
const AddTask = async(req,res)=>{
    try {
        const {title,description,creationDate,completionDate,creator,assignedTo,project} = req.body

        const newTask = new Task({
            Title : title,
            Description : description,
            CreationDate : creationDate,
            CompletionDate : completionDate,
            Creator : creator,
            AssignedTo : assignedTo,
            Project : project
        })

        const createdTask = await newTask.save()
        console.log('createT')

        //Add Project, Users and task to history  
        const newHistory = new History({
            Type : "New",
            Date : new Date(),
            Task : await createdTask._id,
            Users : [creator,assignedTo],
            Project : project,
            Details : "A new Task "+title+ " is created in the project " +  (await Project.findById(project)).Title + " by " + (await User.findById(creator)).FirstName + " and is assigned to " + (await User.findById(assignedTo)).FirstName
         })
         const createdHistory = await newHistory.save()
         console.log('createH')

        //Add Task and History to Project
        const projectToUpdate = await Project.findByIdAndUpdate(
            project,
            { $push: { Tasks: createdTask._id, Histories : createdHistory._id } },
            { new: true, useFindAndModify: false }
          );
           console.log('updateP')
          //Add Task and History To CreatorUser
          const userCreatorToUpdate = await User.findByIdAndUpdate(
            creator,
            { $push: { TasksCreated: createdTask._id , Histories : createdHistory._id } },
            { new: true, useFindAndModify: false }
          );
          console.log('updateCU')
          //Add Task and History To AssignedUser
          const userAssignedToUpdate = await User.findByIdAndUpdate(
            assignedTo,
            { $push: { TasksAssigned: createdTask._id , Histories : createdHistory._id } },
            { new: true, useFindAndModify: false }
          );
          console.log('updateAU')
         //Add History to task
         const taskToUpdate = await Task.findByIdAndUpdate(
            createdTask._id,
            { $push: {  Histories : createdHistory._id } },
            { new: true, useFindAndModify: false }
          );
          console.log('updateT')
          //Return the new task
        res.json({ task : taskToUpdate });
    } catch (error) {
        res.status(500).json({ errors: [{ msg: error.message }] });
    }
}

//Edit Task API
const EditTask = async(req, res) =>{
    try {
      console.log(req.body)
        const {title,description,creationDate,completionDate,status,isOpen,creator,assignedTo,project} = req.body
        console.log(req.body)
             const taskToUpdate = await Task.findById(req.params.id).populate('Project').populate('Creator').populate('AssignedTo')
     
             //Add Task to History
                const newHistory = new History({
                    Type : "Update",
                    Date : new Date(),
                    Task : req.params.id,
                    Users : [creator,assignedTo],
                    Project : project,
                    Details :  "The Task "+title+ " from the project " +  (await Project.findById(project)).Title + " created by "+ (await User.findById(creator)).FirstName + " and assigned to " + (await User.findById(assignedTo)).FirstName+ " is updated " 
                 })
                
                // "Title : " +  taskToUpdate.Title + "-->"+title+"&nbsp; \n"+ 
                //               "Description : " +taskToUpdate.Description + "-->"+description+"&nbsp; \n"+ 
                //               "Creation Date : " +taskToUpdate.CreationDate + "-->"+creationDate+"&nbsp; \n"+ 
                //               "Completion Date : " +taskToUpdate.CompletionDate + "-->"+completionDate+"&nbsp; \n"+ 
                //               "Status: " +taskToUpdate.Status + "-->"+status+"&nbsp; \n"+ 
                //               "Open: " +taskToUpdate.IsOpen + "-->"+isOpen==='on'?true:false+"&nbsp; \n"+ 
                //               "Creator: " +taskToUpdate.Creator.FirstName + "-->"+(await User.findById(creator)).FirstName+"&nbsp; \n"+ 
                //               "AssignedTo: " +taskToUpdate.AssignedTO.FirstName + "-->"+(await User.findById(assignedTo)).FirstName+"&nbsp; \n"+ 
                //               "Project: " +taskToUpdate.Project.Title + "-->"+(await Project.findById(assiprojectgnedTo)).Title+"&nbsp; \n" 
                const createdHistory = await newHistory.save()
                 console.log('createH')
       
        const updatedTask = await Task.findOneAndUpdate({_id : req.params.id},{
                 $set:{  Title : title,
                   Description : description,
                   CreationDate : creationDate,
                   CompletionDate : completionDate,
                   Status : status,
                   IsOpen : isOpen,
                   Creator : creator,
                   NumberDaysOpen : isOpen === false ? 0 : taskToUpdate.NumberDayOpen,
                   AssignedTo : assignedTo,
                   Project : project},
                 $push: {  Histories : createdHistory._id } },
                   { new: true, useFindAndModify: false }
        )
          console.log('updateT')
        //  const updatedTaskWithHistories = await Task.findByIdAndUpdate(
        //     req.params.id,
        //     { $push: {  Histories : createdHistory._id } },
        //     { new: true, useFindAndModify: false }
        //   );
        //   console.log('updateTWH')

        res.json(updatedTask)
    } catch (error) {
        res.status(500).json({ errors: [{ msg: error.message }] });
    }
  }

//Delete Task API
  const DeleteTask= async(req,res)=>{
    try { 
              const task = await Task.findById(req.params.id)
                //Add Task to History
                const newHistory = new History({
                    Type : "Delete",
                    Date : new Date(),
                    Task : req.params.id,
                    Project : task.Project,
                    Details : "The Task " + task.Title + " from the project " +  (await task.populate('Project')).Project.Title + " created by "+ (await task.populate('Creator')).Creator.FirstName + " and assigned to " + (await task.populate('AssignedTo')).AssignedTo.FirstName + " is deleted " 
                 })
                 const createdHistory = await newHistory.save()
                 console.log('createH')
                 
                 //Remove task from project and users
                 const project = await Project.findByIdAndUpdate(createdHistory.Project,
                   {$pull:{Tasks: req.params.id}}, { safe: true, multi:true })
                 const creator = await User.findByIdAndUpdate(task.Creator,
                 {$pull:{TasksCreated: req.params.id}}, { safe: true, multi:true }) 
                 const assignedTo   = await User.findByIdAndUpdate(task.Creator,
                    {$pull:{TasksAssigned: req.params.id}}, { safe: true, multi:true })    
                 

      await Task.findByIdAndRemove(req.params.id)
      console.log('task deleted') 
      res.json(msg= 'task deleted !!')
    } catch (error) {
      res.status(500).json({ errors: [{ msg: error.message }] });
    }
  }

module.exports = {GetAllTasks,AddTask,EditTask,DeleteTask}