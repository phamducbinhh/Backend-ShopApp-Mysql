const db = require('../models')

class CategoryService {
  constructor() {}

  async getCategoryService() {
    try {
      const response = await db.Category.findAll({
        attributes: { exclude: ['createdAt', 'updatedAt'] },
        raw: true
      })

      return {
        success: response ? true : false,
        message: response ? 'Lấy danh mục thành công' : 'Lấy danh mục thất bại',
        data: response ? response : null
      }
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  async getCategoryByIdService({ id }: { id: string }) {
    try {
      const response = await db.Category.findByPk(id, {
        attributes: { exclude: ['createdAt', 'updatedAt'] },
        raw: true
      })

      return {
        success: response ? true : false,
        message: response ? 'Lấy thông tin danh mục thành công' : 'Không tồn tại danh mục này',
        data: response ? response : null
      }
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  async insertCategoryService({ body }: { body: any }) {
    try {
      const [data, created] = await db.Category.findOrCreate({
        where: { name: body.name },
        defaults: body
      })

      return {
        success: created ? true : false,
        message: created ? 'Đã thêm danh mục thành công' : 'Đã tồn tại tên danh mục',
        data: created ? data : null
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
