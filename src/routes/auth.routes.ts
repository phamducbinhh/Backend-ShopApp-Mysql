const express = require('express')

const { AuthController } = require('../controllers')

const validate = require('../middlewares/validate')

const InsertUserSchema = require('../schema/user/insertUserSchema')
const LoginUserSchema = require('../schema/user/loginUserSchema')

const router = express.Router()

router.post('/login', validate(LoginUserSchema), AuthController.login)
router.post('/register', validate(InsertUserSchema), AuthController.register)
router.post('/logout', AuthController.logout)

module.exports = router
