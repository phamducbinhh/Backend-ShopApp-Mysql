const express = require('express')

const { BannerController } = require('../controllers')

const validate = require('../middlewares/validate')

const InsertBannerSchema = require('../schema/banner/insertBannerSchema')

const { verifyToken } = require('../middlewares/jwtMiddleware')

const router = express.Router()

router.get('/', BannerController.getBanners)
router.get('/:id', BannerController.getBannerById)
router.post('/', [validate(InsertBannerSchema), verifyToken], BannerController.insertBanner)
router.put('/:id', verifyToken, BannerController.updateBanner)
router.delete('/:id', verifyToken, BannerController.deleteBanner)

module.exports = router
