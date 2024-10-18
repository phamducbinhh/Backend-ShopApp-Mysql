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
    const transaction = await db.sequelize.transaction() // Bắt đầu transaction
    try {
      const { product_ids } = body

      // Tạo bản ghi banner mới trong bảng Banner
      const response = await db.Banner.create(body, { transaction })

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

        // Tạo bản ghi trong bảng BannerDetail cho các sản phẩm hợp lệ
        const bannerDetailsPromise = filteredProductsIds.map((id: any) =>
          db.BannerDetail.create(
            {
              banner_id: response.id,
              product_id: id
            },
            { transaction }
          )
        )
        // Chờ tất cả bản ghi BannerDetail được tạo
        await Promise.all(bannerDetailsPromise)
      }

      await transaction.commit() // Commit transaction nếu tất cả thành công

      return {
        success: true,
        message: 'Banner đã được thêm thành công',
        data: response
      }
    } catch (error: any) {
      await transaction.rollback() // Rollback transaction nếu có lỗi
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
