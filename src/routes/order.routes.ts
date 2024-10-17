const express = require('express')

const { OrderController } = require('../controllers')

const validate = require('../middlewares/validate')

const InsertOrderSchema = require('../schema/order/insertOrderSchema')

const router = express.Router()

router.get('/', OrderController.getOrders)
router.get('/:id', OrderController.getOrderById)
router.post('/', validate(InsertOrderSchema), OrderController.insertOrder)
router.put('/:id', OrderController.updateOrder)
router.delete('/:id', OrderController.deleteOrder)

module.exports = router
