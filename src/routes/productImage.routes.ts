import { ROLE } from '~/constants/role'

const express = require('express')

const { ProductImageController } = require('../controllers')

const InsertProductImageSchema = require('../schema/productImage/insertProductImageSchema')

const validate = require('../middlewares/validate')

const { verifyRole } = require('../middlewares/jwtMiddleware')

const adminAuth = [verifyRole([ROLE.ADMIN])]

const router = express.Router()

// product image
router.get('/', adminAuth, ProductImageController.getProductImages)
router.get('/:id', adminAuth, ProductImageController.getProductImageById)
router.post('/', [adminAuth, validate(InsertProductImageSchema)], ProductImageController.insertProductImage)
router.put('/:id', adminAuth, ProductImageController.updateProductImage)
router.delete('/:id', adminAuth, ProductImageController.deleteProductImage)

module.exports = router
