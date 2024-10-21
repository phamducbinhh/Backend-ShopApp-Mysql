const express = require('express')

const { ProductImageController } = require('../controllers')

const InsertProductImageSchema = require('../schema/productImage/insertProductImageSchema')

const validate = require('../middlewares/validate')

const verifyToken = require('../middlewares/verifyToken')

const router = express.Router()

// product image
router.get('/', verifyToken, ProductImageController.getProductImages)
router.get('/:id', verifyToken, ProductImageController.getProductImageById)
router.post('/', [validate(InsertProductImageSchema), verifyToken], ProductImageController.insertProductImage)
router.put('/:id', verifyToken, ProductImageController.updateProductImage)
router.delete('/:id', verifyToken, ProductImageController.deleteProductImage)

module.exports = router
