const express = require('express')

const { CartItemController } = require('../controllers')

const InsertCartItemSchema = require('../schema/cartItem/insert')

const validate = require('../middlewares/validate')

const router = express.Router()

router.get('/', CartItemController.getCartItems)
router.get('/:id', CartItemController.getCartItemById)
router.post('/', validate(InsertCartItemSchema), CartItemController.insertCartItem)
router.put('/:id', CartItemController.updateCartItem)
router.delete('/:id', CartItemController.deleteCartItem)

module.exports = router
