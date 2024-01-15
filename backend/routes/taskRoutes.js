const express = require('express')
const router = express.Router()

const {getTasks , postTask , deleteTask , updateTask} = require('../controllers/taskController')


const authenticate= require('../middleware/authentication')
const authorize = require('../middleware/authorization')


router.use(authenticate)

router.get('/' , getTasks)
router.put('/:id', updateTask)
router.post('/' , authorize('manager'), postTask)
router.delete('/:id',authorize('manager') ,deleteTask)


module.exports = router