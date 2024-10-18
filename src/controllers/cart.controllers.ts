const { CartService } = require('../services')
const HttpStatusCode = require('../constants/HttpStatusCode')
const handleError = require('../utils/utility')

class CartController {
  constructor() {}

  // Lấy danh sách giỏ hàng
  async getCarts(req: any, res: any) {
    try {
      const response = await CartService.getCartService(req)

      if (response.success === false) return res.status(HttpStatusCode.NOT_FOUND).json(response)

      return res.status(HttpStatusCode.SUCCESS).json(response)
    } catch (error: any) {
      return handleError(res, error)
    }
  }

  // Lấy thông tin giỏ hàng theo ID
  async getCartById(req: any, res: any) {
    try {
      const response = await CartService.getCartByIdService({ id: req.params.id })

      if (response.success === false) return res.status(HttpStatusCode.NOT_FOUND).json(response)

      return res.status(HttpStatusCode.SUCCESS).json(response)
    } catch (error: any) {
      return handleError(res, error)
    }
  }

  // Thêm mới giỏ hàng
  async insertCart(req: any, res: any) {
    try {
      const response = await CartService.insertCartService({
        body: req.body
      })

      if (response.success === false) return res.status(HttpStatusCode.BAD_REQUEST).json(response)

      return res.status(HttpStatusCode.CREATED).json(response)
    } catch (error: any) {
      return handleError(res, error)
    }
  }

  // Cập nhật giỏ hàng
  async updateCart(req: any, res: any) {
    try {
      const response = await CartService.updateCartService({
        id: req.params.id,
        body: req.body
      })

      if (response.success === false) return res.status(HttpStatusCode.BAD_REQUEST).json(response)

      return res.status(HttpStatusCode.SUCCESS).json(response)
    } catch (error: any) {
      return handleError(res, error)
    }
  }

  // Xóa giỏ hàng
  async deleteCart(req: any, res: any) {
    try {
      const response = await CartService.deleteCartService({ id: req.params.id })

      if (response.success === false) return res.status(HttpStatusCode.NOT_FOUND).json(response)

      return res.status(HttpStatusCode.SUCCESS).json(response)
    } catch (error: any) {
      return handleError(res, error)
    }
  }
}

module.exports = new CartController()
