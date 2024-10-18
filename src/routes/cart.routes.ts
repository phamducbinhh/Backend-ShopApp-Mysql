const express = require('express')

const { CartController } = require('../controllers')

const router = express.Router()

router.get('/', CartController.getCarts)
router.get('/:id', CartController.getCartById)
router.post('/', CartController.insertCart)
router.put('/:id', CartController.updateCart)
router.delete('/:id', CartController.deleteCart)

module.exports = router
