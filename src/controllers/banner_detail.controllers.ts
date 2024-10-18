const { BannerDetailService } = require('../services')
const HttpStatusCode = require('../constants/HttpStatusCode')
const handleError = require('../utils/utility')

class BannerDetailController {
  constructor() {}

  // Lấy danh sách chi tiết banner với phân trang
  async getBannerDetails(req: any, res: any) {
    try {
      const response = await BannerDetailService.getBannerDetailService(req)

      if (!response.success) return res.status(HttpStatusCode.NOT_FOUND).json(response)

      return res.status(HttpStatusCode.SUCCESS).json(response)
    } catch (error: any) {
      return handleError(res, error)
    }
  }

  // Lấy chi tiết banner theo id
  async getBannerDetailById(req: any, res: any) {
    try {
      const response = await BannerDetailService.getBannerDetailByIdService({ id: req.params.id })

      if (!response.success) return res.status(HttpStatusCode.NOT_FOUND).json(response)

      return res.status(HttpStatusCode.SUCCESS).json(response)
    } catch (error: any) {
      return handleError(res, error)
    }
  }

  // Thêm mới chi tiết banner
  async insertBannerDetail(req: any, res: any) {
    try {
      const response = await BannerDetailService.insertBannerDetailService({
        body: req.body
      })

      if (!response.success) return res.status(HttpStatusCode.BAD_REQUEST).json(response)

      return res.status(HttpStatusCode.CREATED).json(response)
    } catch (error: any) {
      return handleError(res, error)
    }
  }

  // Cập nhật chi tiết banner
  async updateBannerDetail(req: any, res: any) {
    try {
      const response = await BannerDetailService.updateBannerDetailService({
        id: req.params.id,
        body: req.body
      })

      if (!response.success) return res.status(HttpStatusCode.BAD_REQUEST).json(response)

      return res.status(HttpStatusCode.SUCCESS).json(response)
    } catch (error: any) {
      return handleError(res, error)
    }
  }

  // Xóa chi tiết banner
  async deleteBannerDetail(req: any, res: any) {
    try {
      const response = await BannerDetailService.deleteBannerDetailService({ id: req.params.id })

      if (!response.success) return res.status(HttpStatusCode.NOT_FOUND).json(response)

      return res.status(HttpStatusCode.SUCCESS).json(response)
    } catch (error: any) {
      return handleError(res, error)
    }
  }
}

module.exports = new BannerDetailController()
