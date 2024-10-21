const express = require('express')

const { NewsDetailController } = require('../controllers')

const validate = require('../middlewares/validate')

const InsertNewDetailSchema = require('../schema/news_detail/insertNewDetailSchema')

const verifyToken = require('../middlewares/verifyToken')

const router = express.Router()

router.get('/', verifyToken, NewsDetailController.getNewsDetails)
router.get('/:id', verifyToken, NewsDetailController.getNewsDetailById)
router.post('/', [validate(InsertNewDetailSchema), verifyToken], NewsDetailController.insertNewsDetail)
router.put('/:id', verifyToken, NewsDetailController.updateNewsDetail)
router.delete('/:id', verifyToken, NewsDetailController.deleteNewsDetail)

module.exports = router
