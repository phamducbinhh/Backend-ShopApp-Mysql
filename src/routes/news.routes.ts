const express = require('express')

const { NewsController } = require('../controllers')

const validate = require('../middlewares/validate')

const InsertNewSchema = require('../schema/news/insertNewSchema')

const router = express.Router()

router.get('/', NewsController.getNews)
router.get('/:id', NewsController.getNewById)
router.post('/', validate(InsertNewSchema), NewsController.insertNew)
router.put('/:id', NewsController.updateNew)
router.delete('/:id', NewsController.deleteNew)

module.exports = router
