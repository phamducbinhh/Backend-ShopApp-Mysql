const { ImageService } = require('../services')
const HttpStatusCode = require('../constants/HttpStatusCode')
const handleError = require('../utils/utility')

class ImageController {
  constructor() {}

  // Hàm xử lý upload ảnh
  async uploadImages(req: any, res: any) {
    try {
      const response = await ImageService.handleUpload(req, res)

      if (!response.success) {
        return res.status(HttpStatusCode.BAD_REQUEST).json(response)
      }

      return res.status(HttpStatusCode.CREATED).json(response)
    } catch (error: any) {
      return handleError(res, error)
    }
  }
}

module.exports = new ImageController()
