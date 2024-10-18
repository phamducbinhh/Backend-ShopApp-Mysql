const express = require('express')

const router = express.Router()

const { ImageController } = require('../controllers')

const uploadMiddleware = require('../middlewares/uploadMiddleware')

router.post('/', uploadMiddleware.array('images', 5), ImageController.uploadImages)

module.exports = router
