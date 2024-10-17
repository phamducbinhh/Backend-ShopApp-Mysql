const express = require('express')

const { ProductController } = require('../controllers')

const ProductInsertSchema = require('../schema/product/productSchema')

const ProductUpdateSchema = require('../schema/product/productUpdateSchema')

const validate = require('../middlewares/validate')

const router = express.Router()

router.get('/', ProductController.getProducts)
router.get('/:id', ProductController.getProductById)
router.post('/', validate(ProductInsertSchema), ProductController.inSertProduct)
router.put('/:id', validate(ProductUpdateSchema), ProductController.updateProduct)
router.delete('/:id', ProductController.deleteProduct)

module.exports = router
