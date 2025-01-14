const db = require('../models')

class CategoryService {
  constructor() {}

  async getCategoryService(req: any) {
    const page = parseInt(req.query.page || 1)
    const limit = parseInt(req.query.limit || 10)
    const offset = (page - 1) * limit
    const search = req.query.search || ''
    try {
      const { rows, count } = await db.Category.findAndCountAll({
        where: {
          name: {
            [db.Sequelize.Op.like]: `%${search}%`
          }
        },
        attributes: { exclude: ['createdAt', 'updatedAt'] },
        limit,
        offset,
        raw: true
      })

      return {
        success: rows ? true : false,
        message: rows ? 'Lấy danh mục thành công' : 'Lấy danh mục thất bại',
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

  async updateCategoryService({ id, body }: { id: string; body: any }) {
    try {
      const response = await db.Category.update(body, {
        where: { id }
      })
      return {
        success: response[0] > 0,
        message: response[0] > 0 ? 'Sửa danh mục thành công' : 'Danh mục không tồn tại'
      }
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  async deleteCategoryService({ id }: { id: string }) {
    try {
      const response = await db.Category.destroy({
        where: { id }
      })

      return {
        success: response ? true : false,
        message: response ? 'Xóa danh mục thành công' : 'Không tìm thấy danh mục để xóa'
      }
    } catch (error: any) {
      throw new Error(error.message)
    }
  }
}

module.exports = new CategoryService()
