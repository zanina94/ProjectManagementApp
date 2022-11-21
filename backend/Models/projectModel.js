const mongoose = require('mongoose')

const projectSchema = mongoose.Schema({
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
    Status : {
        type: String,
        enum: ['Green', 'Yellow', 'Red'],
        default: 'Green'
    },
    IsClosed : {
        type : Boolean,
        default : false
    },
    Tasks : [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref : 'Task'
        }
        ],
    Users : [
        {
           type: mongoose.Schema.Types.ObjectId,
           ref : 'User'
        }
        ],
    Histories : [
        {
           type: mongoose.Schema.Types.ObjectId,
           ref : 'History'
        }
        ]

})

module.exports = mongoose.model('Project',projectSchema)