import { ROLE } from '~/constants/role'

const express = require('express')

const { ProductController } = require('../controllers')

const ProductInsertSchema = require('../schema/product/productSchema')

const ProductUpdateSchema = require('../schema/product/productUpdateSchema')

const validate = require('../middlewares/validate')

const { verifyRole } = require('../middlewares/jwtMiddleware')

const adminAuth = [verifyRole([ROLE.ADMIN])]

const router = express.Router()

router.get('/', adminAuth, ProductController.getProducts)
router.get('/:id', ProductController.getProductById)
router.post('/', [adminAuth, validate(ProductInsertSchema)], ProductController.inSertProduct)
router.put('/:id', [adminAuth, validate(ProductUpdateSchema)], ProductController.updateProduct)
router.delete('/:id', adminAuth, ProductController.deleteProduct)

module.exports = router
