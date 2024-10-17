const express = require('express')

const { UserController } = require('../controllers')

const router = express.Router()

router.get('/', UserController.getUsers)
router.get('/:id', UserController.getUserById)
router.post('/', UserController.insertUser)
router.put('/:id', UserController.updateUser)
router.delete('/:id', UserController.deleteUser)

module.exports = router
