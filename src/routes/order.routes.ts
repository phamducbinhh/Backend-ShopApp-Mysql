import { ROLE } from '~/constants/role'

const express = require('express')

const { OrderController } = require('../controllers')

const validate = require('../middlewares/validate')

const InsertOrderSchema = require('../schema/order/insertOrderSchema')

const { verifyRole } = require('../middlewares/jwtMiddleware')

const adminAuth = [verifyRole([ROLE.ADMIN])]

const router = express.Router()

router.get('/', adminAuth, OrderController.getOrders)
router.get('/:id', adminAuth, OrderController.getOrderById)
router.post('/', [adminAuth, validate(InsertOrderSchema)], OrderController.insertOrder)
router.put('/:id', adminAuth, OrderController.updateOrder)
router.delete('/:id', adminAuth, OrderController.deleteOrder)

module.exports = router
