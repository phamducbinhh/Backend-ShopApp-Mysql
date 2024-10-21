import { ROLE } from '~/constants/role'

const express = require('express')

const { CategoryController } = require('../controllers')

const router = express.Router()

const { verifyRole } = require('../middlewares/jwtMiddleware')

const adminAuth = [verifyRole([ROLE.ADMIN])]

router.get('/', CategoryController.getCategories)
router.get('/:id', CategoryController.getCategoryById)
router.post('/', adminAuth, CategoryController.insertCategory)
router.put('/:id', adminAuth, CategoryController.updateCategory)
router.delete('/:id', adminAuth, CategoryController.deleteCategory)

module.exports = router
