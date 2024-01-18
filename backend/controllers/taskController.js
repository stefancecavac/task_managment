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

const getPendingTask = async(req , res) => {

    try {
        const user_id = req.user._id

        const task = await Task.find({task_status: 'in progress' ,assigned_user: user_id })
        res.status(200).json(task)
    }
    catch(error){
        res.status(500).json({error:error.message})
    }
}

const getCompletedTask = async(req , res) => {

    try {
        const user_id = req.user._id
        const task = await Task.find({task_status: 'completed' ,assigned_user: user_id})
        res.status(200).json(task)
    }
    catch(error){
        res.status(500).json({error:error.message})
    }
}

const getFailedTask = async(req , res) => {

    try {
        const user_id = req.user._id
        const task = await Task.find({task_status: 'failed' ,assigned_user: user_id})
        res.status(200).json(task)
    }
    catch(error){
        res.status(500).json({error:error.message})
    }
}

const postTask = async(req , res) => {
    const {title , start_date , end_date , assigned_user ,task_status} = req.body

    if(!title || !start_date || !end_date || !assigned_user ) {
        return res.status(400).json({error: 'please fill out all fields'})
    }


    try{
       // const user_id = req.user._id

        const task = await Task.create({title , start_date , end_date ,assigned_user , task_status}) // user_id
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

const updateTask = async (req, res) => {
    const { id } = req.params;
    const { task_status} = req.body;

    try {
        const task = await Task.findOneAndUpdate(
            { _id: id },
            {task_status , updatedAt: Date.now() },
            { new: true }
        );

        if (!task) {
            return res.status(404).json({ message: 'No matching task found' });
        }

        res.status(200).json(task);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};




module.exports = {getTasks , postTask , deleteTask ,updateTask ,getPendingTask , getCompletedTask , getFailedTask}