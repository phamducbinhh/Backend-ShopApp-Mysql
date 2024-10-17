const { NewsDetailService } = require('../services')
const HttpStatusCode = require('../constants/HttpStatusCode')
const handleError = require('../utils/utility')

class NewsDetailController {
  constructor() {}

  async getNewsDetails(req: any, res: any) {
    try {
      const response = await NewsDetailService.getNewsDetailService(req)

      if (response.success === false) return res.status(HttpStatusCode.NOT_FOUND).json(response)

      return res.status(HttpStatusCode.SUCCESS).json(response)
    } catch (error) {
      return handleError(res, error)
    }
  }

  async getNewsDetailById(req: any, res: any) {
    try {
      const response = await NewsDetailService.getNewsDetailByIdService({ id: req.params.id })

      if (response.success === false) return res.status(HttpStatusCode.NOT_FOUND).json(response)

      return res.status(HttpStatusCode.SUCCESS).json(response)
    } catch (error) {
      return handleError(res, error)
    }
  }

  async insertNewsDetail(req: any, res: any) {
    try {
      const response = await NewsDetailService.insertNewsDetailService({
        body: req.body
      })

      if (response.success === false) return res.status(HttpStatusCode.BAD_REQUEST).json(response)

      return res.status(HttpStatusCode.CREATED).json(response)
    } catch (error) {
      return handleError(res, error)
    }
  }

  async updateNewsDetail(req: any, res: any) {
    try {
      const response = await NewsDetailService.updateNewsDetailService({
        id: req.params.id,
        body: req.body
      })

      if (response.success === false) return res.status(HttpStatusCode.BAD_REQUEST).json(response)

      return res.status(HttpStatusCode.SUCCESS).json(response)
    } catch (error) {
      return handleError(res, error)
    }
  }

  async deleteNewsDetail(req: any, res: any) {
    try {
      const response = await NewsDetailService.deleteNewsDetailService({ id: req.params.id })

      if (response.success === false) return res.status(HttpStatusCode.NOT_FOUND).json(response)

      return res.status(HttpStatusCode.SUCCESS).json(response)
    } catch (error) {
      return handleError(res, error)
    }
  }
}

module.exports = new NewsDetailController()
