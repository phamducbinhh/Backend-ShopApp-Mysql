const express = require('express')

const { BannerDetailController } = require('../controllers')

// const validate = require('../middlewares/validate')

// const InsertNewDetailSchema = require('../schema/news_detail/insertNewDetailSchema')

const router = express.Router()

router.get('/', BannerDetailController.getBannerDetails)
router.get('/:id', BannerDetailController.getBannerDetailById)
router.post('/', BannerDetailController.insertBannerDetail)
router.put('/:id', BannerDetailController.updateBannerDetail)
router.delete('/:id', BannerDetailController.deleteBannerDetail)

module.exports = router
