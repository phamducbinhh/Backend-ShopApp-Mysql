import { ROLE } from '~/constants/role'

const express = require('express')

const { BannerDetailController } = require('../controllers')

const validate = require('../middlewares/validate')

const InsertBannerDetailSchema = require('../schema//banner_detail/insertBannerDetailSchema')

const router = express.Router()

const { verifyRole } = require('../middlewares/jwtMiddleware')

const adminAuth = [verifyRole([ROLE.ADMIN])]

router.get('/', adminAuth, BannerDetailController.getBannerDetails)
router.get('/:id', adminAuth, BannerDetailController.getBannerDetailById)
router.post('/', [adminAuth, validate(InsertBannerDetailSchema)], BannerDetailController.insertBannerDetail)
router.put('/:id', adminAuth, BannerDetailController.updateBannerDetail)
router.delete('/:id', adminAuth, BannerDetailController.deleteBannerDetail)

module.exports = router
