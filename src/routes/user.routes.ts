import { ROLE } from '~/constants/role'

const express = require('express')

const { UserController } = require('../controllers')

const validate = require('../middlewares/validate')

const InsertUserSchema = require('../schema/user/insertUserSchema')

const { verifyRole } = require('../middlewares/jwtMiddleware')

const router = express.Router()

const adminAuth = [verifyRole([ROLE.ADMIN])]

router.get('/', adminAuth, UserController.getUsers)
router.get('/:id', adminAuth, UserController.getUserById)
router.post('/', [...adminAuth, validate(InsertUserSchema)], UserController.insertUser)
router.put('/:id', adminAuth, UserController.updateUser)
router.delete('/:id', adminAuth, UserController.deleteUser)

module.exports = router
