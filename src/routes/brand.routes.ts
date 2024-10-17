const express = require('express')

const { BrandController } = require('../controllers')

const router = express.Router()

router.get('/', BrandController.getBrands)
router.get('/:id', BrandController.getBrandById)
router.post('/', BrandController.insertBrand)
router.put('/:id', BrandController.updateBrand)
router.delete('/:id', BrandController.deleteBrand)

module.exports = router
