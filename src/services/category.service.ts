const db = require('../models')

class CategoryService {
  constructor() {}

  async getCategoryService() {
    try {
      return {
        success: true,
        message: 'Lấy danh mục thành công'
      }
    } catch (error: any) {
      throw new Error(error.message)
    }
  }
  
  async getCategoryByIdService() {
    try {
      return {
        success: true,
        message: 'Lấy thông tin danh mục'
      }
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  async insertCategoryService({ body }: { body: any }) {
    try {
      return {
        success: true,
        message: 'Thêm mới danh mục thành công',
        data: body
      }
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  async updateCategoryService() {
    try {
      return {
        success: true,
        message: 'Sửa danh mục thành công'
      }
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  async deleteCategoryService() {
    try {
      return {
        success: true,
        message: 'Xóa danh mục thành công'
      }
    } catch (error: any) {
      throw new Error(error.message)
    }
  }
}

module.exports = new CategoryService()
