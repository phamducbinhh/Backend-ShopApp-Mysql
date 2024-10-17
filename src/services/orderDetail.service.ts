const db = require('../models')

class OrderDetailService {
  constructor() {}

  async getOrderDetailService() {
    try {
      const response = await db.OrderDetail.findAll({
        attributes: { exclude: ['createdAt', 'updatedAt'] },
        raw: true
      })

      return {
        success: response.length > 0,
        message: response.length > 0 ? 'Lấy chi tiết đơn hàng thành công' : 'Không có chi tiết đơn hàng nào',
        data: response
      }
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  async getOrderDetailByIdService({ id }: { id: string }) {
    try {
      const response = await db.OrderDetail.findByPk(id, {
        attributes: { exclude: ['createdAt', 'updatedAt'] },
        raw: true
      })

      return {
        success: response ? true : false,
        message: response ? 'Lấy thông tin chi tiết đơn hàng thành công' : 'Không tồn tại chi tiết đơn hàng này',
        data: response ? response : null
      }
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  async insertOrderDetailService({ body }: { body: any }) {
    try {
      const data = await db.OrderDetail.create(body)

      return {
        success: true,
        message: 'Thêm mới chi tiết đơn hàng thành công',
        data: data
      }
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  async updateOrderDetailService({ id, body }: { id: string; body: any }) {
    try {
      const response = await db.OrderDetail.update(body, {
        where: { id }
      })

      return {
        success: response[0] > 0,
        message: response[0] > 0 ? 'Sửa chi tiết đơn hàng thành công' : 'Chi tiết đơn hàng không tồn tại'
      }
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  async deleteOrderDetailService({ id }: { id: string }) {
    try {
      const response = await db.OrderDetail.destroy({
        where: { id }
      })

      return {
        success: response > 0,
        message: response > 0 ? 'Xóa chi tiết đơn hàng thành công' : 'Không tìm thấy chi tiết đơn hàng để xóa'
      }
    } catch (error: any) {
      throw new Error(error.message)
    }
  }
}

module.exports = new OrderDetailService()
