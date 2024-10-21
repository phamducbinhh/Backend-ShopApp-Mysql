const db = require('../models')

class CartService {
  constructor() {}

  // Lấy danh sách các giỏ hàng (có phân trang và tìm kiếm theo user_id)
  async getCartService(req: any) {
    const page = parseInt(req.query.page || 1)
    const limit = parseInt(req.query.limit || 10)
    const offset = (page - 1) * limit
    const { user_id, session_id } = req.query
    const whereCondition = session_id ? { session_id } : user_id ? { user_id } : {}
    try {
      const { rows, count } = await db.Cart.findAndCountAll({
        where: whereCondition,
        limit,
        offset,
        include: [
          {
            model: db.CartItem,
            as: 'cart_items'
          }
        ]
      })

      return {
        success: rows ? true : false,
        message: rows ? 'Lấy giỏ hàng thành công' : 'Không có giỏ hàng nào',
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

  // Lấy thông tin giỏ hàng theo ID
  async getCartByIdService({ id }: { id: string }) {
    try {
      const response = await db.Cart.findByPk(id, {
        attributes: { exclude: ['createdAt', 'updatedAt'] },
        include: [
          {
            model: db.CartItem,
            as: 'cart_items'
          }
        ]
      })

      return {
        success: response ? true : false,
        message: response ? 'Lấy thông tin giỏ hàng thành công' : 'Không tồn tại giỏ hàng này',
        data: response ? response : null
      }
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  // Tạo mới giỏ hàng
  async insertCartService({ body }: { body: any }) {
    const { session_id, user_id } = body

    // Kiểm tra chỉ tồn tại 1 trong 2: user_id hoặc session_id
    if ((!user_id && !session_id) || (user_id && session_id)) {
      return {
        success: false,
        message: 'Yêu cầu không hợp lệ: Chỉ được phép có user_id hoặc session_id'
      }
    }

    try {
      let whereCondition: any = {}

      // Chỉ tìm theo session_id hoặc user_id (nếu tồn tại)
      if (user_id) {
        whereCondition = { user_id }
      } else if (session_id) {
        whereCondition = { session_id }
      }

      // Tìm hoặc tạo giỏ hàng
      const [data, created] = await db.Cart.findOrCreate({
        where: whereCondition,
        defaults: body
      })

      return {
        success: created ? true : false,
        message: created ? 'Tạo giỏ hàng thành công' : 'Giỏ hàng đã tồn tại cho người dùng hoặc session này',
        data: created ? data : null
      }
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  // Thanh toán giỏ hàng
  async checkoutCartService({ body }: { body: any }) {
    const { cart_id, total, note } = body
    const transaction = await db.sequelize.transaction()
    try {
      const cart = await db.Cart.findByPk(cart_id, {
        attributes: { exclude: ['createdAt', 'updatedAt'] },
        include: [
          {
            model: db.CartItem,
            as: 'cart_items',
            include: [
              {
                model: db.Product, // Bao gồm cả thông tin sản phẩm
                as: 'product',
                attributes: ['id', 'price'] // Lấy các thuộc tính cần thiết, như 'price'
              }
            ]
          }
        ]
      })

      if (!cart || !cart.cart_items.length) {
        return {
          success: false,
          message: 'Giỏ hàng không tồn tại hoặc không có sản phẩm'
        }
      }

      // Tính tổng giá trị đơn hàng nếu `total` không được cung cấp
      const calculatedTotal =
        total || cart.cart_items.reduce((acc: number, item: any) => acc + item.quantity * item.product.price, 0)

      // Tạo đơn hàng trong bảng Order
      const newOrder = await db.Order.create(
        {
          user_id: cart.user_id,
          session_id: cart.session_id,
          total: calculatedTotal,
          note: note
        },
        { transaction }
      )

      // Tạo chi tiết đơn hàng cho từng sản phẩm
      for (const item of cart.cart_items) {
        await db.OrderDetail.create(
          {
            order_id: newOrder.id,
            product_id: item.product_id,
            quantity: item.quantity,
            price: item.product.price
          },
          { transaction }
        )
      }

      // Xóa giỏ hàng và các sản phẩm trong giỏ hàng
      await db.CartItem.destroy({ where: { cart_id } }, { transaction })
      await db.Cart.destroy({ where: { id: cart_id } }, { transaction })

      // Commit transaction sau khi tất cả các bước thành công
      await transaction.commit()

      return {
        success: true,
        message: 'Thanh toán thành công',
        data: newOrder
      }
    } catch (error: any) {
      // Rollback nếu có lỗi
      await transaction.rollback()
      throw new Error(error.message)
    }
  }

  // Cập nhật giỏ hàng
  async updateCartService({ id, body }: { id: string; body: any }) {
    try {
      const response = await db.Cart.update(body, {
        where: { id }
      })

      return {
        success: response[0] > 0,
        message: response[0] > 0 ? 'Cập nhật giỏ hàng thành công' : 'Giỏ hàng không tồn tại'
      }
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  // Xóa giỏ hàng
  async deleteCartService({ id }: { id: string }) {
    try {
      const response = await db.Cart.destroy({
        where: { id }
      })

      return {
        success: response ? true : false,
        message: response ? 'Xóa giỏ hàng thành công' : 'Không tìm thấy giỏ hàng để xóa'
      }
    } catch (error: any) {
      throw new Error(error.message)
    }
  }
}

module.exports = new CartService()
