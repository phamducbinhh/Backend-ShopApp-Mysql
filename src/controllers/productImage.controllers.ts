const { ProductImageService } = require('../services')
const HttpStatusCode = require('../constants/HttpStatusCode')
const handleError = require('../utils/utility')

class ProductImageController {
  constructor() {}

  // Lấy danh sách ảnh sản phẩm
  async getProductImages(req: any, res: any) {
    try {
      const response = await ProductImageService.getProductImagesService(req)

      if (response.success === false) {
        return res.status(HttpStatusCode.NOT_FOUND).json(response)
      }

      return res.status(HttpStatusCode.SUCCESS).json(response)
    } catch (error) {
      return handleError(res, error)
    }
  }

  // Lấy ảnh sản phẩm theo ID
  async getProductImageById(req: any, res: any) {
    try {
      const response = await ProductImageService.getProductImageByIdService({ id: req.params.id })

      if (response.success === false) {
        return res.status(HttpStatusCode.NOT_FOUND).json(response)
      }

      return res.status(HttpStatusCode.SUCCESS).json(response)
    } catch (error) {
      return handleError(res, error)
    }
  }

  // Thêm ảnh sản phẩm mới
  async insertProductImage(req: any, res: any) {
    try {
      const response = await ProductImageService.insertProductImageService({
        body: req.body
      })

      if (response.success === false) {
        return res.status(HttpStatusCode.BAD_REQUEST).json(response)
      }

      return res.status(HttpStatusCode.CREATED).json(response)
    } catch (error) {
      return handleError(res, error)
    }
  }

  // Cập nhật ảnh sản phẩm
  async updateProductImage(req: any, res: any) {
    try {
      const response = await ProductImageService.updateProductImageService({
        id: req.params.id,
        body: req.body
      })

      if (response.success === false) {
        return res.status(HttpStatusCode.BAD_REQUEST).json(response)
      }

      return res.status(HttpStatusCode.SUCCESS).json(response)
    } catch (error) {
      return handleError(res, error)
    }
  }

  // Xóa ảnh sản phẩm
  async deleteProductImage(req: any, res: any) {
    try {
      const response = await ProductImageService.deleteProductImageService({ id: req.params.id })

      if (response.success === false) {
        return res.status(HttpStatusCode.NOT_FOUND).json(response)
      }

      return res.status(HttpStatusCode.SUCCESS).json(response)
    } catch (error) {
      return handleError(res, error)
    }
  }
}

module.exports = new ProductImageController()
