const express = require('express')

const { BannerController } = require('../controllers')

// const validate = require('../middlewares/validate')

// const InsertNewSchema = require('../schema/news/insertNewSchema')
// const UpdateNewSchema = require('../schema/news/updateNewSchema')

const router = express.Router()

router.get('/', BannerController.getBanners)
router.get('/:id', BannerController.getBannerById)
router.post('/', BannerController.insertBanner)
router.put('/:id', BannerController.updateBanner)
router.delete('/:id', BannerController.deleteBanner)

module.exports = router
