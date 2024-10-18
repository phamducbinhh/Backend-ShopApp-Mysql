const express = require('express')

const { BannerDetailController } = require('../controllers')

const validate = require('../middlewares/validate')

const InsertBannerDetailSchema = require('../schema//banner_detail/insertBannerDetailSchema')

const router = express.Router()

router.get('/', BannerDetailController.getBannerDetails)
router.get('/:id', BannerDetailController.getBannerDetailById)
router.post('/', validate(InsertBannerDetailSchema), BannerDetailController.insertBannerDetail)
router.put('/:id', BannerDetailController.updateBannerDetail)
router.delete('/:id', BannerDetailController.deleteBannerDetail)

module.exports = router
