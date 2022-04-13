const express = require('express')
const { append } = require('express/lib/response')
const router = express.Router()
const userController = require('../controller/user.controller')

router.post('/register', userController.register)
router.get('/getUser', userController.getUser)

module.exports = router