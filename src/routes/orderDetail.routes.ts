const express = require('express')

const { OrderDetailController } = require('../controllers')

const verifyToken = require('../middlewares/verifyToken')

const router = express.Router()

router.get('/', verifyToken, OrderDetailController.getOrderDetails)
router.get('/:id', verifyToken, OrderDetailController.getOrderDetailById)
router.post('/', verifyToken, OrderDetailController.insertOrderDetail)
router.put('/:id', verifyToken, OrderDetailController.updateOrderDetail)
router.delete('/:id', verifyToken, OrderDetailController.deleteOrderDetail)

module.exports = router
