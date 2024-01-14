const mongoose = require('mongoose')
const Schema = mongoose.Schema

const validator = require('validator')
const bcrypt = require('bcrypt')

const userSchema = new Schema({
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        required:true,
        enum:['employee' , 'manager'],
        default: 'employee'
    }
})

userSchema.statics.register = async function(email, password) {


    if(!email || !password){
        throw Error('please fill out all fields')
    } 

    if(!validator.isEmail(email)){
        throw Error('not a valid email')
    }
    if(!validator.isStrongPassword(password)){
        throw Error('not a strong password')
    }

    const exists = await this.findOne({email})

    if(exists){
        throw Error('email already in use')
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password , salt)

    const user = await this.create({email , password : hash})

    return user

}

userSchema.statics.login = async function(email, password) {
  

    if(!email || !password){
        throw Error('please fill out all fields')
    } 

    const user = await this.findOne({email})

    if(!user){
        throw Error('incorrect email')
    }

    const compare = await bcrypt.compare(password , user.password)

    if(!compare){
        throw Error('incorrect password')
    }

    return user

}

module.exports = mongoose.model('User',userSchema)