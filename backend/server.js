//  Required External Modules

const dotenv = require ("dotenv")
const express =require ("express")
const cors = require("cors")
const helmet = require("helmet")
const ConnectDb = require("./Config/connectDb")
const userRoutes = require("./Routes/userRoutes")
const projectRoutes = require("./Routes/projectRoutes")
const taskRoutes = require("./Routes/taskRoutes")
const historyRoutes = require("./Routes/historyRoutes")
const cron = require('node-cron');
const {UpdateTasksNumberOpenDays,UpdateProjectsStatuesByTasks} =require('./Jobs/schedulingJobs')
const path = require("path")

 dotenv.config();

//  App Variables
 
if (!process.env.PORT) {
    process.exit(1);
 }
 
 const PORT = process.env.PORT;
 const app = express();

//  App Configuration

app.use(helmet());
app.use(cors());
app.use(express.json());
ConnectDb()

// executing functions to update task numberOpenDays and project status automatically every day at 20H:00

cron.schedule('* 20 * * *', () => {UpdateTasksNumberOpenDays()});
cron.schedule('* 20 * * *', () => {UpdateProjectsStatuesByTasks()});

// Defining Routes

app.use('/api/users',userRoutes)
app.use('/api/projects',projectRoutes)
app.use('/api/tasks',taskRoutes)
app.use('/api/histories',historyRoutes)

//Preparing to deployement

const dirname = path.resolve()
if(process.env.NODE_ENV === 'production')
{
    app.use(express.static(path.join(dirname,'/frontend/build')))
    app.get('*', (req,res)=>
      res.sendFile(path.resolve(dirname,'frontend','build','index.html'))    
    )
}
else{
    app.get('/',(req,res)=>{
        res.send('API is running....')
    }
    )
}


//  Server Activation

app.listen(PORT,(err)=>{
  err ? console.error(err) : console.log(`server running on port ${PORT}`)
})