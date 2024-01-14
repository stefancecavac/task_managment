const Task = require('../models/taskModels')
const mongoose = require('mongoose')

const getTasks = async(req , res) => {
    
    try{
        const user_id = req.user._id
        const task = await Task.find({assigned_user: user_id})
        res.status(200).json(task)
    }
    catch(error){
        res.status(500).json({error:error.message})
    }
}

const postTask = async(req , res) => {
    const {title , date , assigned_user} = req.body

    if(!title || !date || !assigned_user ) {
        return res.status(400).json({error: 'please fill out all fields'})
    }


    try{
       // const user_id = req.user._id

        const task = await Task.create({title , date ,assigned_user}) // user_id
        res.status(201).json(task)
    }
    catch(error){
        res.status(500).json({error: error.message})
       
    }
}

const deleteTask = async(req, res) => {
    const{id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({message: 'not a valid id'})
    }
    
    try{
        const task = await Task.findOneAndDelete({_id : id})

        if(!task){
            return res.status(400).json({message: 'no such task'})
        }

        res.status(201).json(task)
    }
    catch(error){
        res.status(500).json({error:error.message})
    }
}

module.exports = {getTasks , postTask , deleteTask}