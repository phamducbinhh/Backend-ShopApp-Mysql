import { ROLE } from '~/constants/role'

const express = require('express')

const { OrderDetailController } = require('../controllers')

const { verifyRole } = require('../middlewares/jwtMiddleware')

const adminAuth = [verifyRole([ROLE.ADMIN])]

const router = express.Router()

router.get('/', adminAuth, OrderDetailController.getOrderDetails)
router.get('/:id', adminAuth, OrderDetailController.getOrderDetailById)
router.post('/', adminAuth, OrderDetailController.insertOrderDetail)
router.put('/:id', adminAuth, OrderDetailController.updateOrderDetail)
router.delete('/:id', adminAuth, OrderDetailController.deleteOrderDetail)

module.exports = router
