const express = require('express')

const { NewsController } = require('../controllers')

const router = express.Router()

router.get('/', NewsController.getNews)
router.get('/:id', NewsController.getNewById)
router.post('/', NewsController.insertNew)
router.put('/:id', NewsController.updateNew)
router.delete('/:id', NewsController.deleteNew)

module.exports = router
