const db = require('../models')

class NewsDetailService {
  constructor() {}

  async getNewsDetailService(req: any) {
    const page = parseInt(req.query.page || 1)
    const limit = parseInt(req.query.limit || 10)
    const offset = (page - 1) * limit

    try {
      const { rows, count } = await db.NewsDetail.findAndCountAll({
        include: [
          {
            model: db.Product,
            as: 'product',
            attributes: {
              exclude: ['createdAt', 'updatedAt', 'categoryId']
            }
          },
          {
            model: db.News,
            as: 'news',
            attributes: {
              exclude: ['createdAt', 'updatedAt', 'categoryId']
            }
          }
        ],
        attributes: { exclude: ['createdAt', 'updatedAt'] },
        limit,
        offset
      })

      return {
        success: rows.length > 0,
        message: rows.length > 0 ? 'Lấy chi tiết tin tức thành công' : 'Không tìm thấy chi tiết tin tức',
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

  async getNewsDetailByIdService({ id }: { id: string }) {
    try {
      const response = await db.NewsDetail.findByPk(id, {
        include: [
          {
            model: db.Product,
            as: 'product',
            attributes: {
              exclude: ['createdAt', 'updatedAt', 'categoryId']
            }
          },
          {
            model: db.News,
            as: 'news',
            attributes: {
              exclude: ['createdAt', 'updatedAt', 'categoryId']
            }
          }
        ],
        attributes: { exclude: ['createdAt', 'updatedAt'] }
      })

      return {
        success: response ? true : false,
        message: response ? 'Lấy thông tin chi tiết tin tức thành công' : 'Không tồn tại chi tiết tin tức này',
        data: response || null
      }
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  async insertNewsDetailService({ body }: { body: any }) {
    const { product_id, news_id } = body
    try {
      const productExists = await db.Product.findByPk(product_id)
      if (!productExists) {
        return {
          success: false,
          message: 'Sản phẩm không tồn tại'
        }
      }

      const newsExists = await db.News.findByPk(news_id)
      if (!newsExists) {
        return {
          success: false,
          message: 'Tin tức không tồn tại'
        }
      }

      const duplicateExists = await db.NewsDetail.findOne({ where: { product_id, news_id } })
      if (duplicateExists) {
        return {
          success: false,
          message: 'Sản phẩm hoặc tin tức đã tồn tại'
        }
      }

      const response = await db.NewsDetail.create(body)

      return {
        success: response ? true : false,
        message: response ? 'Đã thêm chi tiết tin tức thành công' : 'Đã tồn tại tiêu đề chi tiết tin tức',
        data: response ? response : null
      }
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  async updateNewsDetailService({ id, body }: { id: string; body: any }) {
    const { product_id, news_id } = body
    try {
      const existingDuplicate = await db.NewsDetail.findOne({
        where: { product_id, news_id, id: { [db.Sequelize.Op.ne]: id } }
      })

      if (existingDuplicate) {
        return {
          success: false,
          message: 'Sản phẩm hoặc tin tức đã tồn tại'
        }
      }

      const response = await db.NewsDetail.update(body, {
        where: { id }
      })

      return {
        success: response[0] > 0,
        message: response[0] > 0 ? 'Sửa chi tiết tin tức thành công' : 'Chi tiết tin tức không tồn tại'
      }
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  async deleteNewsDetailService({ id }: { id: string }) {
    try {
      const response = await db.NewsDetail.destroy({
        where: { id }
      })

      return {
        success: response > 0,
        message: response > 0 ? 'Xóa chi tiết tin tức thành công' : 'Không tìm thấy chi tiết tin tức để xóa'
      }
    } catch (error: any) {
      throw new Error(error.message)
    }
  }
}

module.exports = new NewsDetailService()
