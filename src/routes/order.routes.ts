const express = require('express')

const { OrderController } = require('../controllers')

const router = express.Router()

router.get('/', OrderController.getOrders)
router.get('/:id', OrderController.getOrderById)
router.post('/', OrderController.insertOrder)
router.put('/:id', OrderController.updateOrder)
router.delete('/:id', OrderController.deleteOrder)

module.exports = router
