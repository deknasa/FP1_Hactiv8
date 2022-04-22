const express = require('express')
const router = express.Router()
const verify = require("../midleware/authentication").verify
const authorization = require("../midleware/authorization").authorization
const reflectionsController = require('../controller/reflections.controllers')
const { reflectionsValidation, reflectionsById } = require("../midleware/joiValidation")

router.use(verify);

router.post('/', reflectionsValidation, reflectionsController.postReflections)
router.get('/', reflectionsController.getReflections)
router.put('/:id', reflectionsById, authorization, reflectionsValidation, reflectionsController.updateReflections)
router.delete('/:id',reflectionsById, authorization, reflectionsController.deleteReflections)

module.exports = router