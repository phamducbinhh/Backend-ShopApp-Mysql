const express = require('express')

const { CategoryController } = require('../controllers')

const router = express.Router()

router.get('/',  CategoryController.getCategories)
router.get('/:id',  CategoryController.getCategoryById)
router.post('/',  CategoryController.insertCategory)
router.put('/:id',  CategoryController.updateCategory)
router.delete('/:id',  CategoryController.deleteCategory)

module.exports = router
