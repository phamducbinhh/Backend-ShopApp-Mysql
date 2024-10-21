const db = require('../models')

class OrderService {
  constructor() {}

  async getOrderService() {
    try {
      const response = await db.Order.findAll({
        attributes: { exclude: ['createdAt', 'updatedAt'] },
        raw: true
      })

      return {
        success: response.length > 0,
        message: response.length > 0 ? 'Lấy đơn hàng thành công' : 'Không có đơn hàng nào',
        data: response
      }
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  async getOrderByIdService({ id }: { id: string }) {
    try {
      const response = await db.Order.findByPk(id, {
        attributes: { exclude: ['createdAt', 'updatedAt'] },
        include: [
          {
            model: db.OrderDetail,
            as: 'order_details'
          }
        ]
      })

      return {
        success: response ? true : false,
        message: response ? 'Lấy thông tin đơn hàng thành công' : 'Không tồn tại đơn hàng này',
        data: response ? response : null
      }
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  async insertOrderService({ body }: { body: any }) {
    const userExists = await db.User.findByPk(body.user_id)
    if (!userExists) {
      return {
        success: false,
        message: 'Người dùng không tồn tại'
      }
    }
    try {
      const data = await db.Order.create(body)

      return {
        success: true,
        message: 'Thêm mới đơn hàng thành công',
        data: data
      }
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  async updateOrderService({ id, body }: { id: string; body: any }) {
    try {
      const response = await db.Order.update(body, {
        where: { id }
      })

      return {
        success: response[0] > 0,
        message: response[0] > 0 ? 'Sửa đơn hàng thành công' : 'Đơn hàng không tồn tại'
      }
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  async deleteOrderService({ id }: { id: string }) {
    try {
      const response = await db.Order.destroy({
        where: { id }
      })

      return {
        success: response > 0,
        message: response > 0 ? 'Xóa đơn hàng thành công' : 'Không tìm thấy đơn hàng để xóa'
      }
    } catch (error: any) {
      throw new Error(error.message)
    }
  }
}

module.exports = new OrderService()
