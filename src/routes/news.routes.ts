import { ROLE } from '~/constants/role'

const express = require('express')

const { NewsController } = require('../controllers')

const validate = require('../middlewares/validate')

const { verifyRole } = require('../middlewares/jwtMiddleware')

const adminAuth = [verifyRole([ROLE.ADMIN])]

const InsertNewSchema = require('../schema/news/insertNewSchema')

const UpdateNewSchema = require('../schema/news/updateNewSchema')

const router = express.Router()

router.get('/', NewsController.getNews)
router.get('/:id', NewsController.getNewById)
router.post('/', [adminAuth, validate(InsertNewSchema)], NewsController.insertNew)
router.put('/:id', [adminAuth, validate(UpdateNewSchema)], NewsController.updateNew)
router.delete('/:id', adminAuth, NewsController.deleteNew)

module.exports = router
