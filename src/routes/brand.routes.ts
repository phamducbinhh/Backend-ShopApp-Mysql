const express = require('express')

const { BrandController } = require('../controllers')

const { verifyToken } = require('../middlewares/jwtMiddleware')

const router = express.Router()

router.get('/', BrandController.getBrands)
router.get('/:id', BrandController.getBrandById)
router.post('/', verifyToken, BrandController.insertBrand)
router.put('/:id', verifyToken, BrandController.updateBrand)
router.delete('/:id', verifyToken, BrandController.deleteBrand)

module.exports = router
