const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({
    FirstName: {
        type: String,
        required: true
    },
    LastName: {
        type: String,
        required: true
    },
    Email: {
        type: String,
        required: true,
        unique: true,
        match : [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    Password: {
        type: String,
        required: true,
        minmength: 6
    },
    Role: {
        type: String,
        enum: ['User', 'Admin'],
        default: 'User'
    },
    Projects : [
        {
           type: mongoose.Schema.Types.ObjectId,
           ref : 'Project'
        }
        ],
    TasksCreated : [
            {
               type: mongoose.Schema.Types.ObjectId,
               ref : 'Task'
            }
            ]  ,
    TasksAssigned : [
        {
           type: mongoose.Schema.Types.ObjectId,
           ref : 'Task'
        }
        ],
    Histories : [
        {
           type: mongoose.Schema.Types.ObjectId,
           ref : 'History'
        }
        ]  
})

module.exports = mongoose.model('User',userSchema)
