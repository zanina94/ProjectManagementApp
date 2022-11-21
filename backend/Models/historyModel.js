const mongoose = require('mongoose')

const historySchema = mongoose.Schema({
    Type : {
        type: String,
        enum: ['New', 'Update', 'Delete'],
    },
    Date : {
        type : Date,
        required : true
    },
    Details : {
        type : String,
        required : true
    },
    Users : 
    [
        {
      type: mongoose.Schema.Types.ObjectId,
      ref : 'User',
        }
    ],
    Task : 
    {
      type: mongoose.Schema.Types.ObjectId,
      ref : 'Task',
    },
    Project : 
        {
           type: mongoose.Schema.Types.ObjectId,
           ref : 'Project',
        }
})

module.exports = mongoose.model('History',historySchema)