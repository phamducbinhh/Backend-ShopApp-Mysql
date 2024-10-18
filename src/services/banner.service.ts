const db = require('../models')

class BannerService {
  constructor() {}

  async getBannerService(req: any) {
    const page = parseInt(req.query.page || 1)
    const limit = parseInt(req.query.limit || 10)
    const offset = (page - 1) * limit
    const search = req.query.search || ''

    try {
      const { rows, count } = await db.Banner.findAndCountAll({
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
        message: rows.length > 0 ? 'Lấy banner thành công' : 'Không có banner nào',
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

  async getBannerByIdService({ id }: { id: string }) {
    try {
      const response = await db.Banner.findByPk(id, {
        attributes: { exclude: ['createdAt', 'updatedAt'] },
        raw: true
      })

      return {
        success: response ? true : false,
        message: response ? 'Lấy thông tin banner thành công' : 'Không tồn tại banner này',
        data: response || null
      }
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  async insertBannerService({ body }: { body: any }) {
    try {
      const [data, created] = await db.Banner.findOrCreate({
        where: { name: body.name },
        defaults: body
      })

      return {
        success: created ? true : false,
        message: created ? 'Đã thêm banner thành công' : 'Đã tồn tại tên banner',
        data: created ? data : null
      }
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  async updateBannerService({ id, body }: { id: string; body: any }) {
    try {
      const existingTitle = await db.Banner.findOne({
        where: { name: body.name, id: { [db.Sequelize.Op.ne]: id } }
      })

      if (existingTitle) {
        return {
          success: false,
          message: 'Tiêu đề đã tồn tại'
        }
      }

      const response = await db.Banner.update(body, {
        where: { id }
      })

      return {
        success: response[0] > 0,
        message: response[0] > 0 ? 'Sửa banner thành công' : 'Banner không tồn tại'
      }
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  async deleteBannerService({ id }: { id: string }) {
    const transaction = await db.sequelize.transaction()
    try {
      await db.BannerDetail.destroy({
        where: { banner_id: id },
        transaction
      })

      const response = await db.Banner.destroy({
        where: { id },
        transaction
      })

      if (response) {
        await transaction.commit()
        return {
          success: true,
          message: 'Xóa banner thành công'
        }
      } else {
        await transaction.rollback()
        return {
          success: false,
          message: 'Không tìm thấy banner để xóa'
        }
      }
    } catch (error: any) {
      await transaction.rollback()
      throw new Error(error.message)
    }
  }
}

module.exports = new BannerService()
