const db = require('../models')

class NewService {
  constructor() {}

  async getNewService(req: any) {
    const page = parseInt(req.query.page || 1)
    const limit = parseInt(req.query.limit || 10)
    const offset = (page - 1) * limit
    const search = req.query.search || ''

    try {
      const { rows, count } = await db.News.findAndCountAll({
        where: {
          title: {
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
    const transaction = await db.sequelize.transaction() // Bắt đầu transaction
    try {
      const { product_ids } = body

      // Tạo bản ghi tin tức mới trong bảng News
      const response = await db.News.create(body, { transaction })

      // Kiểm tra nếu có danh sách sản phẩm liên quan
      if (product_ids && product_ids.length > 0) {
        // Tìm tất cả sản phẩm có trong danh sách product_ids
        const validProducts = await db.Product.findAll({
          where: {
            id: {
              [db.Sequelize.Op.in]: product_ids // Kiểm tra danh sách ID sản phẩm
            }
          }
        })

        // Lấy danh sách ID sản phẩm hợp lệ
        const validProductsIds = validProducts.map((product: any) => product.id)

        // Chỉ giữ lại những sản phẩm có id hợp lệ
        const filteredProductsIds = product_ids.filter((id: any) => validProductsIds.includes(id))

        // Tạo bản ghi trong bảng NewsDetail cho các sản phẩm hợp lệ
        const newsDetailsPromise = filteredProductsIds.map((id: any) =>
          db.NewsDetail.create(
            {
              news_id: response.id,
              product_id: id
            },
            { transaction }
          )
        )
        // Chờ tất cả bản ghi NewsDetail được tạo
        await Promise.all(newsDetailsPromise)
      }

      await transaction.commit() // Commit transaction nếu tất cả thành công

      return {
        success: true,
        message: 'Tin tức đã được thêm thành công',
        data: response
      }
    } catch (error: any) {
      await transaction.rollback() // Rollback transaction nếu có lỗi
      throw new Error(error.message)
    }
  }

  async updateNewService({ id, body }: { id: string; body: any }) {
    try {
      const existingTitle = await db.News.findOne({
        where: { title: body.title, id: { [db.Sequelize.Op.ne]: id } }
      })

      if (existingTitle) {
        return {
          success: false,
          message: 'Tiêu đề đã tồn tại'
        }
      }

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
    const transaction = await db.sequelize.transaction()
    try {
      await db.NewsDetail.destroy({
        where: { news_id: id },
        transaction
      })

      const response = await db.News.destroy({
        where: { id },
        transaction
      })

      if (response) {
        await transaction.commit()
        return {
          success: true,
          message: 'Xóa tin tức thành công'
        }
      } else {
        await transaction.rollback()
        return {
          success: false,
          message: 'Không tìm thấy tin tức để xóa'
        }
      }
    } catch (error: any) {
      await transaction.rollback()
      throw new Error(error.message)
    }
  }
}

module.exports = new NewService()
