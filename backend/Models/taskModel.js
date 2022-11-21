const mongoose = require('mongoose')

const taskSchema = mongoose.Schema({
    Title : {
        type : String,
        required : true
    },
    Description : {
        type : String,
        required : true
    },
    CreationDate : {
        type : Date,
        required : true
    },
    CompletionDate : {
        type : Date,
        required : true
    },
    Status : {
        type: String,
        enum: ['New', 'Active', 'Done'],
        default: 'New'
    },
    IsOpen : {
        type : Boolean,
        default : false
    },
    NumberDaysOpen : {
        type : Number,
        default : 0
    },
    Creator : 
    {
      type: mongoose.Schema.Types.ObjectId,
      ref : 'User',
    },
    AssignedTo : 
        {
          type: mongoose.Schema.Types.ObjectId,
          ref : 'User',
        }
        ,
    Project : 
        {
           type: mongoose.Schema.Types.ObjectId,
           ref : 'Project',
        },
    Histories : [
        {
           type: mongoose.Schema.Types.ObjectId,
           ref : 'History'
        }
        ]
        

})

module.exports = mongoose.model('Task',taskSchema)