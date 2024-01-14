const mongoose = require('mongoose')
const Schema = mongoose.Schema

const taskSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    date:{
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
    }
    
    
})

module.exports = mongoose.model('Task' , taskSchema)