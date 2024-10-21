import { ROLE } from '~/constants/role'

const express = require('express')

const { NewsDetailController } = require('../controllers')

const validate = require('../middlewares/validate')

const InsertNewDetailSchema = require('../schema/news_detail/insertNewDetailSchema')

const { verifyRole } = require('../middlewares/jwtMiddleware')

const adminAuth = [verifyRole([ROLE.ADMIN])]

const router = express.Router()

router.get('/', adminAuth, NewsDetailController.getNewsDetails)
router.get('/:id', adminAuth, NewsDetailController.getNewsDetailById)
router.post('/', [adminAuth, validate(InsertNewDetailSchema)], NewsDetailController.insertNewsDetail)
router.put('/:id', adminAuth, NewsDetailController.updateNewsDetail)
router.delete('/:id', adminAuth, NewsDetailController.deleteNewsDetail)

module.exports = router
