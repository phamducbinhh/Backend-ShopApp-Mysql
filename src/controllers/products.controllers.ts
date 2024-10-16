const { ProductService } = require('../services')
const HttpStatusCode = require('../constants/HttpStatusCode')
const ProductSchema = require('../schema/productSchema')
const handleError = require('../utils/utility')

class ProductController {
  constructor() {}

  async getProducts(req: any, res: any) {
    try {
      const response = await ProductService.getProductSerivce()

      if (response.success === false) return res.status(HttpStatusCode.NOT_FOUND).json(response)

      return res.status(HttpStatusCode.SUCCESS).json(response)
    } catch (error: any) {
      return handleError(res, error)
    }
  }

  async getProductById(req: any, res: any) {
    try {
      const response = await ProductService.getProductByIdSerivce()

      if (response.success === false) return res.status(HttpStatusCode.NOT_FOUND).json(response)

      return res.status(HttpStatusCode.SUCCESS).json(response)
    } catch (error: any) {
      return handleError(res, error)
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
      return handleError(res, error)
    }
  }

  async updateProduct(req: any, res: any) {
    try {
      const response = await ProductService.updateProductSerivce()

      if (response.success === false) return res.status(HttpStatusCode.NOT_FOUND).json(response)

      return res.status(HttpStatusCode.SUCCESS).json(response)
    } catch (error: any) {
      return handleError(res, error)
    }
  }

  async deleteProduct(req: any, res: any) {
    try {
      const response = await ProductService.deleteProductSerivce()

      if (response.success === false) return res.status(HttpStatusCode.NOT_FOUND).json(response)

      return res.status(HttpStatusCode.SUCCESS).json(response)
    } catch (error: any) {
      return handleError(res, error)
    }
  }
}

module.exports = new ProductController()
