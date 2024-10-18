const { BannerService } = require('../services')
const HttpStatusCode = require('../constants/HttpStatusCode')
const handleError = require('../utils/utility')

class BannerController {
  constructor() {}

  // Lấy danh sách banner với phân trang và tìm kiếm
  async getBanners(req: any, res: any) {
    try {
      const response = await BannerService.getBannerService(req)

      if (response.success === false) return res.status(HttpStatusCode.NOT_FOUND).json(response)

      return res.status(HttpStatusCode.SUCCESS).json(response)
    } catch (error: any) {
      return handleError(res, error)
    }
  }

  // Lấy thông tin chi tiết banner theo id
  async getBannerById(req: any, res: any) {
    try {
      const response = await BannerService.getBannerByIdService({ id: req.params.id })

      if (response.success === false) return res.status(HttpStatusCode.NOT_FOUND).json(response)

      return res.status(HttpStatusCode.SUCCESS).json(response)
    } catch (error: any) {
      return handleError(res, error)
    }
  }

  // Tạo mới banner
  async insertBanner(req: any, res: any) {
    try {
      const response = await BannerService.insertBannerService({
        body: req.body
      })

      if (response.success === false) return res.status(HttpStatusCode.BAD_REQUEST).json(response)

      return res.status(HttpStatusCode.CREATED).json(response)
    } catch (error: any) {
      return handleError(res, error)
    }
  }

  // Cập nhật banner theo id
  async updateBanner(req: any, res: any) {
    try {
      const response = await BannerService.updateBannerService({
        id: req.params.id,
        body: req.body
      })

      if (response.success === false) return res.status(HttpStatusCode.BAD_REQUEST).json(response)

      return res.status(HttpStatusCode.SUCCESS).json(response)
    } catch (error: any) {
      return handleError(res, error)
    }
  }

  // Xóa banner theo id
  async deleteBanner(req: any, res: any) {
    try {
      const response = await BannerService.deleteBannerService({ id: req.params.id })

      if (response.success === false) return res.status(HttpStatusCode.NOT_FOUND).json(response)

      return res.status(HttpStatusCode.SUCCESS).json(response)
    } catch (error: any) {
      return handleError(res, error)
    }
  }
}

module.exports = new BannerController()