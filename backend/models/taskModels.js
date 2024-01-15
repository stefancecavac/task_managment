const mongoose = require('mongoose')
const Schema = mongoose.Schema

const taskSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    start_date:{
        type:Date,
        required:true
    },
    end_date:{
        type:Date,
        required:true
    },
   // user_id:{
    //    type:String,
    //    required:true
  //  },
    assigned_user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'employee',
        required: true
    },
    task_status:{
        type:String,
        enum:["in progress" , 'completed' , 'failed'],
        default: 'in progress'
    }
    
    
})

module.exports = mongoose.model('Task' , taskSchema)