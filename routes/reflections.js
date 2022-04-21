const express = require('express')
const router = express.Router()
const verify = require("../midleware/authentication").verify
const authorization = require("../midleware/authorization").authorization
const reflectionsController = require('../controller/reflections.controllers')

router.use(verify);

router.post('/', reflectionsController.postReflections)
router.get('/', reflectionsController.getReflections)
router.put('/:id', authorization, reflectionsController.updateReflections)
router.delete('/:id', authorization, reflectionsController.deleteReflections)

module.exports = router