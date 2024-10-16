const db = require('../models')

class CategoryService {
  constructor() {}

  async getCategorySerivce() {
    try {
      return {
        success: true,
        message: 'Lấy danh mục thành công'
      }
    } catch (error: any) {
      throw new Error(error.message)
    }
  }
}

module.exports = new CategoryService()
