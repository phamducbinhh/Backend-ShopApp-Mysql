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
}

module.exports = new ProductService()
