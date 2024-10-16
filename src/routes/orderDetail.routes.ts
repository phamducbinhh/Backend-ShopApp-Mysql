const express = require('express')

const { OrderDetailController } = require('../controllers')

const router = express.Router()

router.get('/',  OrderDetailController.getOrderDetails)
router.get('/:id',  OrderDetailController.getOrderDetailById)
router.post('/',  OrderDetailController.insertOrderDetail)
router.put('/:id',  OrderDetailController.updateOrderDetail)
router.delete('/:id',  OrderDetailController.deleteOrderDetail)


module.exports = router
