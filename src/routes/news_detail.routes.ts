const express = require('express')

const { NewsDetailController } = require('../controllers')

// const validate = require('../middlewares/validate')

// const InsertNewSchema = require('../schema/news/insertNewSchema')

const router = express.Router()

router.get('/', NewsDetailController.getNewsDetails)
router.get('/:id', NewsDetailController.getNewsDetailById)
router.post('/', NewsDetailController.insertNewsDetail)
router.put('/:id', NewsDetailController.updateNewsDetail)
router.delete('/:id', NewsDetailController.deleteNewsDetail)

module.exports = router
