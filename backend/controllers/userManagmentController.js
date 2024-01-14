const User = require('../models/userModel')

const getUsers = async(req , res) => {

    try{
        const user = await User.find({role: 'employee'})
        res.status(200).json(user)
    }
    catch(error){
        res.status(500).json({error: error.message})
    }
}

module.exports = getUsers