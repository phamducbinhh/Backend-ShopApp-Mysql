const express = require('express')

const { CartItemController } = require('../controllers')

const router = express.Router()

router.get('/', CartItemController.getCartItems)
router.get('/:id', CartItemController.getCartItemById)
router.post('/', CartItemController.insertCartItem)
router.put('/:id', CartItemController.updateCartItem)
router.delete('/:id', CartItemController.deleteCartItem)

module.exports = router
