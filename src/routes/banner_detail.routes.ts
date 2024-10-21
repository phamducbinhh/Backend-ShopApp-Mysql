const express = require('express')

const { BannerDetailController } = require('../controllers')

const validate = require('../middlewares/validate')

const InsertBannerDetailSchema = require('../schema//banner_detail/insertBannerDetailSchema')

const router = express.Router()

const { verifyToken } = require('../middlewares/jwtMiddleware')

router.get('/', verifyToken, BannerDetailController.getBannerDetails)
router.get('/:id', verifyToken, BannerDetailController.getBannerDetailById)
router.post('/', [validate(InsertBannerDetailSchema), verifyToken], BannerDetailController.insertBannerDetail)
router.put('/:id', verifyToken, BannerDetailController.updateBannerDetail)
router.delete('/:id', verifyToken, BannerDetailController.deleteBannerDetail)

module.exports = router
