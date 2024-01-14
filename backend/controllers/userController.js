const User = require('../models/userModel')
const jwt = require('jsonwebtoken')

const createWebToken = (_id  ,role) => {
    return jwt.sign({_id , role} , process.env.SECRET , {expiresIn: '3d'})
}

const loginUser = async(req, res) => {
    const {email , password} = req.body

    try{
        const user = await User.login(email , password)
        const token = createWebToken(user._id )
        res.status(201).json({...user.toObject(), token})
       
    }
    catch(error){
        res.status(400).json({error: error.message})
    }
}

const registerUser = async(req, res) => {
    const {email , password} = req.body

    try{
        const user = await User.register(email , password )
        const token = createWebToken(user._id)
        res.status(201).json({...user.toObject(), token})
    }
    catch(error){
        res.status(400).json({error: error.message})
    }
}



 
module.exports = {loginUser, registerUser} 