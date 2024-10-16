const db = require('../models')

class OrderService {
  constructor() {}

  async getOrderService() {
    try {
      return {
        success: true,
        message: 'Lấy đơn hàng thành công'
      }
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  async getOrderByIdService() {
    try {
      return {
        success: true,
        message: 'Lấy thông tin đơn hàng thành công'
      }
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  async insertOrderService() {
    try {
      return {
        success: true,
        message: 'Thêm mới đơn hàng thành công'
      }
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  async updateOrderService() {
    try {
      return {
        success: true,
        message: 'Sửa đơn hàng thành công'
      }
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  async deleteOrderService() {
    try {
      return {
        success: true,
        message: 'Xóa đơn hàng thành công'
      }
    } catch (error: any) {
      throw new Error(error.message)
    }
  }
}

module.exports = new OrderService()
