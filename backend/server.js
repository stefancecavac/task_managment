require('dotenv').config()

const express = require('express')
const app = express()

const cors = require('cors')

const mongoose = require('mongoose')

const taskRouter = require('./routes/taskRoutes')
const userRouter = require('./routes/userRoute')
const UserManagmentRouter = require('./routes/userManagmentRoute')

app.use(cors())
app.use(express.json())

app.use('/api/tasks' , taskRouter)
app.use('/api/user', userRouter)
app.use('/api/users', UserManagmentRouter)




mongoose.connect(process.env.DB_URI)
    .then(() => {
        app.listen(process.env.PORT , () => {
            console.log(`DB connected and server started on port: ${process.env.PORT}`)
        })
    })
    .catch((error) => {
        console.log(error)
    })