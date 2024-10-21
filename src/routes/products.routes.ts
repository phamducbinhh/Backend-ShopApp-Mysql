const express = require('express')

const { ProductController } = require('../controllers')

const ProductInsertSchema = require('../schema/product/productSchema')

const ProductUpdateSchema = require('../schema/product/productUpdateSchema')

const validate = require('../middlewares/validate')

const verifyToken = require('../middlewares/verifyToken')

const router = express.Router()

router.get('/', ProductController.getProducts)
router.get('/:id', ProductController.getProductById)
router.post('/', [validate(ProductInsertSchema), verifyToken], ProductController.inSertProduct)
router.put('/:id', [validate(ProductUpdateSchema), verifyToken], ProductController.updateProduct)
router.delete('/:id', verifyToken, ProductController.deleteProduct)

module.exports = router
