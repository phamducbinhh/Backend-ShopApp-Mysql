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

    if ((!user_id && !session_id) || (user_id && session_id)) {
      return {
        success: false,
        message: 'Yêu cầu không hợp lệ'
      }
    }
    try {
      const [data, created] = await db.Cart.findOrCreate({
        where: {
          [db.Sequelize.Op.or]: [{ user_id: user_id ? user_id : null }, { session_id: session_id ? session_id : null }]
        },
        defaults: body
      })

      return {
        success: created ? true : false,
        message: created ? 'Tạo giỏ hàng thành công' : 'Giỏ hàng đã tồn tại cho người dùng này',
        data: created ? data : null
      }
    } catch (error: any) {
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
