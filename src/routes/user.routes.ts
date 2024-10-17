const express = require('express')

const { UserController } = require('../controllers')

const validate = require('../middlewares/validate')

const InsertUserSchema = require('../schema/user/insertUserSchema')

const router = express.Router()

router.get('/', UserController.getUsers)
router.get('/:id', UserController.getUserById)
router.post('/', validate(InsertUserSchema), UserController.insertUser)
router.put('/:id', UserController.updateUser)
router.delete('/:id', UserController.deleteUser)

module.exports = router
