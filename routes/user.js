const express = require('express')
const router = express.Router()
const userController = require('../controller/user.controller')

router.post('/register', userController.register)
router.post('/login', userController.login)
router.get('/getUser', userController.getUser)

module.exports = router