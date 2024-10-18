const express = require('express')

const { NewsController } = require('../controllers')

const validate = require('../middlewares/validate')

const InsertNewSchema = require('../schema/news/insertNewSchema')
const UpdateNewSchema = require('../schema/news/updateNewSchema')

const router = express.Router()

router.get('/', NewsController.getNews)
router.get('/:id', NewsController.getNewById)
router.post('/', validate(InsertNewSchema), NewsController.insertNew)
router.put('/:id', validate(UpdateNewSchema), NewsController.updateNew)
router.delete('/:id', NewsController.deleteNew)

module.exports = router
