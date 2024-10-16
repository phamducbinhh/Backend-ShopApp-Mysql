const db = require('../models')

class ProductService {
  constructor() {}

  async getProductSerivce() {
    try {
      return {
        success: true,
        message: 'Lấy sản phẩm thành công'
      }
    } catch (error: any) {
      throw new Error(error.message)
    }
  }
  async getProductByIdSerivce() {
    try {
      return {
        success: true,
        message: 'Lấy thông tin sản phẩm'
      }
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  async inSertProductSerivce({ body }: { body: any }) {
    try {
      return {
        success: true,
        message: 'Thêm mới sản phẩm thành công',
        data: body
      }
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  async updateProductSerivce() {
    try {
      return {
        success: true,
        message: 'Sửa sản phẩm thành công'
      }
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  async deleteProductSerivce() {
    try {
      return {
        success: true,
        message: 'Xóa sản phẩm thành công'
      }
    } catch (error: any) {
      throw new Error(error.message)
    }
  }
}

module.exports = new ProductService()
