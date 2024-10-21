const express = require('express')

const { OrderController } = require('../controllers')

const validate = require('../middlewares/validate')

const InsertOrderSchema = require('../schema/order/insertOrderSchema')

const { verifyToken } = require('../middlewares/jwtMiddleware')

const router = express.Router()

router.get('/', verifyToken, OrderController.getOrders)
router.get('/:id', verifyToken, OrderController.getOrderById)
router.post('/', [validate(InsertOrderSchema), verifyToken], OrderController.insertOrder)
router.put('/:id', verifyToken, OrderController.updateOrder)
router.delete('/:id', verifyToken, OrderController.deleteOrder)

module.exports = router
