const db = require('../models')

class BannerDetailService {
  constructor() {}

  // Lấy danh sách chi tiết banner với phân trang
  async getBannerDetailService(req: any) {
    const page = parseInt(req.query.page || 1)
    const limit = parseInt(req.query.limit || 10)
    const offset = (page - 1) * limit

    try {
      const { rows, count } = await db.BannerDetail.findAndCountAll({
        include: [
          {
            model: db.Product,
            as: 'product',
            attributes: {
              exclude: ['createdAt', 'updatedAt', 'categoryId']
            }
          },
          {
            model: db.Banner,
            as: 'banner',
            attributes: {
              exclude: ['createdAt', 'updatedAt']
            }
          }
        ],
        attributes: { exclude: ['createdAt', 'updatedAt'] },
        limit,
        offset
      })

      return {
        success: rows.length > 0,
        message: rows.length > 0 ? 'Lấy chi tiết banner thành công' : 'Không tìm thấy chi tiết banner',
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

  // Lấy chi tiết banner theo id
  async getBannerDetailByIdService({ id }: { id: string }) {
    try {
      const response = await db.BannerDetail.findByPk(id, {
        include: [
          {
            model: db.Product,
            as: 'product',
            attributes: {
              exclude: ['createdAt', 'updatedAt', 'categoryId']
            }
          },
          {
            model: db.Banner,
            as: 'banner',
            attributes: {
              exclude: ['createdAt', 'updatedAt']
            }
          }
        ],
        attributes: { exclude: ['createdAt', 'updatedAt'] }
      })

      return {
        success: response ? true : false,
        message: response ? 'Lấy thông tin chi tiết banner thành công' : 'Không tồn tại chi tiết banner này',
        data: response || null
      }
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  // Thêm chi tiết banner
  async insertBannerDetailService({ body }: { body: any }) {
    const { product_id, banner_id } = body
    try {
      const productExists = await db.Product.findByPk(product_id)
      if (!productExists) {
        return {
          success: false,
          message: 'Sản phẩm không tồn tại'
        }
      }

      const bannerExists = await db.Banner.findByPk(banner_id)
      if (!bannerExists) {
        return {
          success: false,
          message: 'Banner không tồn tại'
        }
      }

      const duplicateExists = await db.BannerDetail.findOne({ where: { product_id, banner_id } })
      if (duplicateExists) {
        return {
          success: false,
          message: 'Sản phẩm hoặc banner đã tồn tại'
        }
      }

      const response = await db.BannerDetail.create(body)

      return {
        success: true,
        message: 'Đã thêm chi tiết banner thành công',
        data: response
      }
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  // Cập nhật chi tiết banner
  async updateBannerDetailService({ id, body }: { id: string; body: any }) {
    const { product_id, banner_id } = body
    try {
      const existingDuplicate = await db.BannerDetail.findOne({
        where: { product_id, banner_id, id: { [db.Sequelize.Op.ne]: id } }
      })

      if (existingDuplicate) {
        return {
          success: false,
          message: 'Sản phẩm hoặc banner đã tồn tại'
        }
      }

      const response = await db.BannerDetail.update(body, {
        where: { id }
      })

      return {
        success: response[0] > 0,
        message: response[0] > 0 ? 'Sửa chi tiết banner thành công' : 'Chi tiết banner không tồn tại'
      }
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  // Xóa chi tiết banner
  async deleteBannerDetailService({ id }: { id: string }) {
    try {
      const response = await db.BannerDetail.destroy({
        where: { id }
      })

      return {
        success: response > 0,
        message: response > 0 ? 'Xóa chi tiết banner thành công' : 'Không tìm thấy chi tiết banner để xóa'
      }
    } catch (error: any) {
      throw new Error(error.message)
    }
  }
}

module.exports = new BannerDetailService()
