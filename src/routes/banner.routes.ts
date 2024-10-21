import { ROLE } from '~/constants/role'

const express = require('express')

const { BannerController } = require('../controllers')

const validate = require('../middlewares/validate')

const InsertBannerSchema = require('../schema/banner/insertBannerSchema')

const { verifyRole } = require('../middlewares/jwtMiddleware')

const adminAuth = [verifyRole([ROLE.ADMIN])]

const router = express.Router()

router.get('/', BannerController.getBanners)
router.get('/:id', BannerController.getBannerById)
router.post('/', [adminAuth, validate(InsertBannerSchema)], BannerController.insertBanner)
router.put('/:id', adminAuth, BannerController.updateBanner)
router.delete('/:id', adminAuth, BannerController.deleteBanner)

module.exports = router
