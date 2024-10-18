const db = require('../models')

class CartItemService {
  constructor() {}

  // Lấy danh sách sản phẩm trong giỏ hàng (có phân trang)
  async getCartItemsService(req: any) {
    const page = parseInt(req.query.page || 1)
    const limit = parseInt(req.query.limit || 10)
    const offset = (page - 1) * limit
    const cart_id = req.query.cart_id || ''

    try {
      const { rows, count } = await db.CartItem.findAndCountAll({
        where: cart_id ? { cart_id: cart_id } : {},
        include: [
          {
            model: db.Product,
            as: 'product'
          }
        ],
        attributes: { exclude: ['createdAt', 'updatedAt'] },
        limit,
        offset,
        raw: true
      })

      return {
        success: rows ? true : false,
        message: rows ? 'Lấy sản phẩm trong giỏ hàng thành công' : 'Không tìm thấy sản phẩm nào trong giỏ hàng',
        data: {
          totalItems: count,
          itemsPerPage: limit,
          currentPage: page,
          totalPages: Math.ceil(count / limit),
          items: rows
        }
      }
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  // Lấy thông tin sản phẩm theo ID trong giỏ hàng
  async getCartItemByIdService({ id }: { id: string }) {
    try {
      const response = await db.CartItem.findByPk(id, {
        include: [
          {
            model: db.Product,
            as: 'product',
            attributes: ['name', 'price', 'image_url']
          }
        ],
        attributes: { exclude: ['createdAt', 'updatedAt'] },
        raw: true
      })

      return {
        success: response ? true : false,
        message: response
          ? 'Lấy thông tin sản phẩm trong giỏ hàng thành công'
          : 'Không tồn tại sản phẩm này trong giỏ hàng',
        data: response ? response : null
      }
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  // Thêm sản phẩm vào giỏ hàng
  async insertCartItemService({ body }: { body: any }) {
    try {
      const productExists = await db.Product.findByPk(body.product_id)
      if (!productExists) {
        return {
          success: false,
          message: 'Sản phẩm không tồn tại'
        }
      }

      const [data, created] = await db.CartItem.findOrCreate({
        where: { cart_id: body.cart_id, product_id: body.product_id },
        defaults: body
      })

      return {
        success: created ? true : false,
        message: created ? 'Thêm sản phẩm vào giỏ hàng thành công' : 'Sản phẩm đã tồn tại trong giỏ hàng',
        data: created ? data : null
      }
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  // Cập nhật sản phẩm trong giỏ hàng
  async updateCartItemService({ id, body }: { id: string; body: any }) {
    try {
      const response = await db.CartItem.update(body, {
        where: { id }
      })

      return {
        success: response[0] > 0,
        message:
          response[0] > 0 ? 'Cập nhật sản phẩm trong giỏ hàng thành công' : 'Sản phẩm không tồn tại trong giỏ hàng'
      }
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  // Xóa sản phẩm khỏi giỏ hàng
  async deleteCartItemService({ id }: { id: string }) {
    try {
      const response = await db.CartItem.destroy({
        where: { id }
      })

      return {
        success: response ? true : false,
        message: response ? 'Xóa sản phẩm khỏi giỏ hàng thành công' : 'Không tìm thấy sản phẩm để xóa'
      }
    } catch (error: any) {
      throw new Error(error.message)
    }
  }
}

module.exports = new CartItemService()
