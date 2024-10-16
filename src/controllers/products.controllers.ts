const { ProductService } = require('../services')
const HttpStatusCode = require('../constants/HttpStatusCode')
const ProductSchema = require('../schema/productSchema')
class ProductController {
  constructor() {}

  async getProducts(req: any, res: any) {
    try {
      const response = await ProductService.getProductSerivce()

      if (response.success === false) return res.status(HttpStatusCode.NOT_FOUND).json(response)

      return res.status(HttpStatusCode.SUCCESS).json(response)
    } catch (error: any) {
      return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: error.message
      })
    }
  }

  async getProductById(req: any, res: any) {
    try {
      const response = await ProductService.getProductByIdSerivce()

      if (response.success === false) return res.status(HttpStatusCode.NOT_FOUND).json(response)

      return res.status(HttpStatusCode.SUCCESS).json(response)
    } catch (error: any) {
      return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: error.message
      })
    }
  }

  async inSertProduct(req: any, res: any) {
    const { error } = ProductSchema.validate(req.body)

    if (error) {
      return res.status(HttpStatusCode.BAD_REQUEST).json({
        success: false,
        message: error.details[0]?.message
      })
    }

    try {
      const response = await ProductService.inSertProductSerivce({
        body: req.body
      })

      if (response.success === false) return res.status(HttpStatusCode.NOT_FOUND).json(response)

      return res.status(HttpStatusCode.CREATED).json(response)
    } catch (error: any) {
      return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: error.message
      })
    }
  }

  async updateProduct(req: any, res: any) {
    try {
      const response = await ProductService.updateProductSerivce()

      if (response.success === false) return res.status(HttpStatusCode.NOT_FOUND).json(response)

      return res.status(HttpStatusCode.SUCCESS).json(response)
    } catch (error: any) {
      return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: error.message
      })
    }
  }

  async deleteProduct(req: any, res: any) {
    try {
      const response = await ProductService.deleteProductSerivce()

      if (response.success === false) return res.status(HttpStatusCode.NOT_FOUND).json(response)

      return res.status(HttpStatusCode.SUCCESS).json(response)
    } catch (error: any) {
      return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: error.message
      })
    }
  }
}

module.exports = new ProductController()
