const express = require('express')
const router = express.Router()

const {getTasks , postTask , deleteTask} = require('../controllers/taskController')


const authenticate= require('../middleware/authentication')
const authorize = require('../middleware/authorization')


router.use(authenticate)

router.get('/' , getTasks)


router.post('/' , authorize('manager'), postTask)
router.delete('/:id',authorize('manager') ,deleteTask)


module.exports = router