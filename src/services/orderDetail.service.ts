const db = require('../models')

class OrderDetailService {
  constructor() {}

  async getOrderDetailService() {
    try {
      return {
        success: true,
        message: 'Lấy chi tiết đơn hàng thành công'
      }
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  async getOrderDetailByIdService() {
    try {
      return {
        success: true,
        message: 'Lấy thông tin chi tiết đơn hàng thành công'
      }
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  async insertOrderDetailService() {
    try {
      return {
        success: true,
        message: 'Thêm mới chi tiết đơn hàng thành công'
      }
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  async updateOrderDetailService() {
    try {
      return {
        success: true,
        message: 'Sửa chi tiết đơn hàng thành công'
      }
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  async deleteOrderDetailService() {
    try {
      return {
        success: true,
        message: 'Xóa chi tiết đơn hàng thành công'
      }
    } catch (error: any) {
      throw new Error(error.message)
    }
  }
}

module.exports = new OrderDetailService()
