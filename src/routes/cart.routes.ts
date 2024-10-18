const express = require('express')

const { CartController } = require('../controllers')

const InsertCartSchema = require('../schema/cart/insert')

const validate = require('../middlewares/validate')

const router = express.Router()

router.get('/', CartController.getCarts)
router.get('/:id', CartController.getCartById)
router.post('/', validate(InsertCartSchema), CartController.insertCart)
router.put('/:id', CartController.updateCart)
router.delete('/:id', CartController.deleteCart)

module.exports = router
