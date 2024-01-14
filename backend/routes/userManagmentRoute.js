const express = require('express')
const router = express.Router()

const getUsers = require('../controllers/userManagmentController')

router.get('/',getUsers)

module.exports = router