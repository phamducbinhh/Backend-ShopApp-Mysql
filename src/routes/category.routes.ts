const express = require('express')

const { CategoryController } = require('../controllers')

const router = express.Router()

const verifyToken = require('../middlewares/verifyToken')

router.get('/', verifyToken, CategoryController.getCategories)
router.get('/:id', verifyToken, CategoryController.getCategoryById)
router.post('/', verifyToken, CategoryController.insertCategory)
router.put('/:id', verifyToken, CategoryController.updateCategory)
router.delete('/:id', verifyToken, CategoryController.deleteCategory)

module.exports = router
