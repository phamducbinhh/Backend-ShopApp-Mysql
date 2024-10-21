import { ROLE } from '~/constants/role'

const express = require('express')

const { BrandController } = require('../controllers')

const { verifyRole } = require('../middlewares/jwtMiddleware')

const adminAuth = [verifyRole([ROLE.ADMIN])]

const router = express.Router()

router.get('/', BrandController.getBrands)
router.get('/:id', BrandController.getBrandById)
router.post('/', adminAuth, BrandController.insertBrand)
router.put('/:id', adminAuth, BrandController.updateBrand)
router.delete('/:id', adminAuth, BrandController.deleteBrand)

module.exports = router
