const express = require('express')

const { ProductImageController } = require('../controllers')

const InsertProductImageSchema = require('../schema/productImage/insertProductImageSchema')

const validate = require('../middlewares/validate')

const router = express.Router()

// product image
router.get('/', ProductImageController.getProductImages)
router.get('/:id', ProductImageController.getProductImageById)
router.post('/', validate(InsertProductImageSchema), ProductImageController.insertProductImage)
router.put('/:id', ProductImageController.updateProductImage)
router.delete('/:id', ProductImageController.deleteProductImage)

module.exports = router
