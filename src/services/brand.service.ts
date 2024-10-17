const db = require('../models')

class BrandService {
  constructor() {}

  async getBrandService(req: any) {
    const page = parseInt(req.query.page || 1)
    const limit = parseInt(req.query.limit || 5)
    const offset = (page - 1) * limit
    const search = req.query.search || ''
    try {
      const { rows, count } = await db.Brand.findAndCountAll({
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
        message: rows ? 'Lấy thương hiệu thành công' : 'Lấy thương hiệu thất bại',
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

  async getBrandByIdService({ id }: { id: string }) {
    try {
      const response = await db.Brand.findByPk(id, {
        attributes: { exclude: ['createdAt', 'updatedAt'] },
        raw: true
      })

      return {
        success: response ? true : false,
        message: response ? 'Lấy thông tin thương hiệu thành công' : 'Không tồn tại thương hiệu này',
        data: response ? response : null
      }
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  async insertBrandService({ body }: { body: any }) {
    try {
      const [data, created] = await db.Brand.findOrCreate({
        where: { name: body.name },
        defaults: body
      })

      return {
        success: created ? true : false,
        message: created ? 'Đã thêm thương hiệu thành công' : 'Đã tồn tại tên thương hiệu',
        data: created ? data : null
      }
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  async updateBrandService() {
    try {
      return {
        success: true,
        message: 'Sửa thương hiệu thành công'
      }
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  async deleteBrandService() {
    try {
      return {
        success: true,
        message: 'Xóa thương hiệu thành công'
      }
    } catch (error: any) {
      throw new Error(error.message)
    }
  }
}

module.exports = new BrandService()
