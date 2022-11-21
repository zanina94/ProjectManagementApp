const Project = require("../Models/projectModel");
const Task = require("../Models/taskModel");
const User = require("../Models/userModel");
const History = require("../Models/historyModel");


//Get All Projects API
const GetAllProjects = async(req,res)=>{
    const projects = await Project.find({}).populate('Tasks').populate('Users')
    return res.json(projects)
}

//Add Project API
const AddProject = async(req,res)=>{
    try {
        const {title,description,creationDate,users} = req.body
        const newProject = new Project({
            Title : title,
            Description : description,
            CreationDate : creationDate,
            Users : users
        })
        
        const createdProject = await newProject.save()
        //Add Project and Users to history  
        const newHistory = new History({
           Type : "New",
           Date : new Date(),
           Users : users,
           Project : createdProject._id,
           Details : " " 
        })
    
        const createdHistory = await newHistory.save()
        const historyToUpdate = await History.findByIdAndUpdate(createdHistory._id,
            {Details : "A new Project "+ title + " is created and is assigned to "+ 
            (await createdHistory.populate('Users')).Users.map(user=>user.FirstName+' '+ user.LastName)},
            { new: true, useFindAndModify: false })

    // Add Project and histories to users
        users.map(async user=> {
            const userToUpdate = await User.findByIdAndUpdate(
                user,
                { $push: { Projects: createdProject._id , Histories: createdHistory._id} },
                { new: true, useFindAndModify: false }
              );
            }
            )
console.log('updateUsers')
      //Add History to project          
      const projectToUpdate = await Project.findByIdAndUpdate(
        createdProject._id,
        { $push: {Histories: createdHistory._id} },
        { new: true, useFindAndModify: false }
      );
      console.log('updateProject')
        res.json({ project : projectToUpdate });
    } catch (error) {
        res.status(500).json({ errors: [{ msg: error.message }] });
    }
}
//Close Project API
const CloseProject = async(req, res) =>{
    try {
        const {isClosed} = req.body

        const project = await Project.findOneAndUpdate({_id : req.params.id},{ IsClosed : isClosed},{ new: true, useFindAndModify: false })
        console.log('updateP')

                        //Add Project  to history  
                        const newHistory = new History({
                            Type : "Update",
                            Date : new Date(),
                            Project : req.params.id,
                            Details : "The project "+ project.Title + (isClosed == true ? " is closed" : " is open")
                         })
                     
                         const createdHistory = await newHistory.save()
        console.log('createH')
        const projectToUpdate = await Project.findByIdAndUpdate(
            project._id,
            { $push: {Histories: createdHistory._id} },
            { new: true, useFindAndModify: false }
          );
        console.log('updateP')
        res.json({project})
    } catch (error) {
        res.status(500).json({ errors: [{ msg: error.message }] });
    }
}

//Edit Project API
const EditProject = async(req, res) =>{
    try {
      console.log(req.body)
        const {title,description,creationDate,users} = req.body
        console.log(req.body)
             const projectToUpdate = await Project.findById(req.params.id)
     
             //Add Project to History
                const newHistory = new History({
                    Type : "Update",
                    Date : new Date(),
                    Users : users,
                    Project : req.params.id,
                    Details :  "The Project "+projectToUpdate.Title+ " is updated " 
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
        

        //Add History to the project and update the project
        const updatedProject = await Project.findOneAndUpdate({_id : req.params.id},{
                 $set:{  Title : title,
                   Description : description,
                   CreationDate : creationDate,
                  Users : users},
                 $push: {  Histories : createdHistory._id } },
                   { new: true, useFindAndModify: false }
        )
          console.log('updateP')

        //  const updatedTaskWithHistories = await Task.findByIdAndUpdate(
        //     req.params.id,
        //     { $push: {  Histories : createdHistory._id } },
        //     { new: true, useFindAndModify: false }
        //   );
        //   console.log('updateTWH')

        res.json(updatedProject)
    } catch (error) {
        res.status(500).json({ errors: [{ msg: error.message }] });
    }
  }

module.exports = {GetAllProjects,AddProject,CloseProject,EditProject}                    
