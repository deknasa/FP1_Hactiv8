const express = require('express')
const router = express.Router()
const verify = require("../midleware/authentication").verify
const authorization = require("../midleware/authorization").authorization
const reflectionsController = require('../controller/reflections.controllers')

router.post('/', verify, reflectionsController.postReflections)
router.get('/', verify, reflectionsController.getReflections)
router.put('/updateReflections/:id'), authorization, reflectionsController.updateReflections
router.get('/getAllReflections', reflectionsController.getAllReflections)

module.exports = router