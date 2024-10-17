const db = require('../models')

class OrderService {
  constructor() {}

  // Phân trang và tìm kiếm đơn hàng
  async getOrderService(req: any) {
    const page = parseInt(req.query.page || 1)
    const limit = parseInt(req.query.limit || 5)
    const offset = (page - 1) * limit
    const search = req.query.search || ''

    try {
      const { rows, count } = await db.Order.findAndCountAll({
        where: {
          // Ví dụ tìm kiếm theo trường 'orderNumber' hoặc 'customerName'
          orderNumber: {
            [db.Sequelize.Op.like]: `%${search}%`
          }
        },
        attributes: { exclude: ['createdAt', 'updatedAt'] },
        limit,
        offset,
        raw: true
      })

      return {
        success: rows.length > 0,
        message: rows.length > 0 ? 'Lấy đơn hàng thành công' : 'Không tìm thấy đơn hàng',
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

  // Lấy đơn hàng theo ID
  async getOrderByIdService({ id }: { id: string }) {
    try {
      const response = await db.Order.findByPk(id, {
        attributes: { exclude: ['createdAt', 'updatedAt'] },
        raw: true
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

  // Thêm đơn hàng mới
  async insertOrderService({ body }: { body: any }) {
    try {
      const [data, created] = await db.Order.findOrCreate({
        where: { orderNumber: body.orderNumber },
        defaults: body
      })

      return {
        success: created,
        message: created ? 'Thêm mới đơn hàng thành công' : 'Đơn hàng đã tồn tại',
        data: created ? data : null
      }
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  // Sửa đơn hàng
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

  // Xóa đơn hàng
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
