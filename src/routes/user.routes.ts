const express = require('express')

const { UserController } = require('../controllers')

const validate = require('../middlewares/validate')

const InsertUserSchema = require('../schema/user/insertUserSchema')

const verifyToken = require('../middlewares/verifyToken')

const router = express.Router()

router.get('/', verifyToken, UserController.getUsers)
router.get('/:id', verifyToken, UserController.getUserById)
router.post('/', [validate(InsertUserSchema), verifyToken], UserController.insertUser)
router.put('/:id', verifyToken, UserController.updateUser)
router.delete('/:id', verifyToken, UserController.deleteUser)

module.exports = router
