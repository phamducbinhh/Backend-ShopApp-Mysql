const { CartItemService } = require('../services')
const HttpStatusCode = require('../constants/HttpStatusCode')
const handleError = require('../utils/utility')

class CartItemController {
  constructor() {}

  // Lấy danh sách sản phẩm trong giỏ hàng
  async getCartItems(req: any, res: any) {
    try {
      const response = await CartItemService.getCartItemsService(req)

      if (response.success === false) return res.status(HttpStatusCode.NOT_FOUND).json(response)

      return res.status(HttpStatusCode.SUCCESS).json(response)
    } catch (error: any) {
      return handleError(res, error)
    }
  }

  // Lấy thông tin sản phẩm trong giỏ hàng theo ID
  async getCartItemById(req: any, res: any) {
    try {
      const response = await CartItemService.getCartItemByIdService({ id: req.params.id })

      if (response.success === false) return res.status(HttpStatusCode.NOT_FOUND).json(response)

      return res.status(HttpStatusCode.SUCCESS).json(response)
    } catch (error: any) {
      return handleError(res, error)
    }
  }

  // Thêm sản phẩm vào giỏ hàng
  async insertCartItem(req: any, res: any) {
    try {
      const response = await CartItemService.insertCartItemService({
        body: req.body
      })

      if (response.success === false) return res.status(HttpStatusCode.BAD_REQUEST).json(response)

      return res.status(HttpStatusCode.CREATED).json(response)
    } catch (error: any) {
      return handleError(res, error)
    }
  }

  // Cập nhật sản phẩm trong giỏ hàng
  async updateCartItem(req: any, res: any) {
    try {
      const response = await CartItemService.updateCartItemService({
        id: req.params.id,
        body: req.body
      })

      if (response.success === false) return res.status(HttpStatusCode.BAD_REQUEST).json(response)

      return res.status(HttpStatusCode.SUCCESS).json(response)
    } catch (error: any) {
      return handleError(res, error)
    }
  }

  // Xóa sản phẩm khỏi giỏ hàng
  async deleteCartItem(req: any, res: any) {
    try {
      const response = await CartItemService.deleteCartItemService({ id: req.params.id })

      if (response.success === false) return res.status(HttpStatusCode.NOT_FOUND).json(response)

      return res.status(HttpStatusCode.SUCCESS).json(response)
    } catch (error: any) {
      return handleError(res, error)
    }
  }
}

module.exports = new CartItemController()
