const db = require('../models')

class NewService {
  constructor() {}

  async getNewService(req: any) {
    const page = parseInt(req.query.page || 1)
    const limit = parseInt(req.query.limit || 5)
    const offset = (page - 1) * limit
    const search = req.query.search || ''

    try {
      const { rows, count } = await db.News.findAndCountAll({
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
        success: rows.length > 0,
        message: rows.length > 0 ? 'Lấy tin tức thành công' : 'Không có tin tức nào',
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

  async getNewByIdService({ id }: { id: string }) {
    try {
      const response = await db.News.findByPk(id, {
        attributes: { exclude: ['createdAt', 'updatedAt'] },
        raw: true
      })

      return {
        success: response ? true : false,
        message: response ? 'Lấy thông tin tin tức thành công' : 'Không tồn tại tin tức này',
        data: response || null
      }
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  async insertNewService({ body }: { body: any }) {
    try {
      const [data, created] = await db.News.findOrCreate({
        where: { title: body.title },
        defaults: body
      })

      return {
        success: created,
        message: created ? 'Đã thêm tin tức thành công' : 'Đã tồn tại tiêu đề tin tức',
        data: created ? data : null
      }
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  async updateNewService({ id, body }: { id: string; body: any }) {
    try {
      const response = await db.News.update(body, {
        where: { id }
      })

      return {
        success: response[0] > 0,
        message: response[0] > 0 ? 'Sửa tin tức thành công' : 'Tin tức không tồn tại'
      }
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  async deleteNewService({ id }: { id: string }) {
    try {
      const response = await db.News.destroy({
        where: { id }
      })

      return {
        success: response > 0,
        message: response > 0 ? 'Xóa tin tức thành công' : 'Không tìm thấy tin tức để xóa'
      }
    } catch (error: any) {
      throw new Error(error.message)
    }
  }
}

module.exports = new NewService()
