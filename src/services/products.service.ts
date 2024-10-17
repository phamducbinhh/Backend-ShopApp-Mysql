const db = require('../models')

class ProductService {
  constructor() {}

  async getProductSerivce(req: any) {
    const page = parseInt(req.query.page || 1)
    const limit = parseInt(req.query.limit || 5)
    const offset = (page - 1) * limit
    const search = req.query.search || ''
    try {
      const whereCondition = search
        ? {
            [db.Sequelize.Op.or]: [
              { name: { [db.Sequelize.Op.like]: `%${search}%` } },
              { description: { [db.Sequelize.Op.like]: `%${search}%` } }
            ]
          }
        : {}

      const { rows, count } = await db.Product.findAndCountAll({
        where: whereCondition,
        attributes: { exclude: ['createdAt', 'updatedAt'] },
        limit,
        offset,
        raw: true
      })

      return {
        success: rows ? true : false,
        message: rows ? 'Lấy sản phẩm thành công' : 'Lấy sản phẩm thất bại',
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
  async getProductByIdSerivce({ id }: { id: string }) {
    try {
      const response = await db.Product.findByPk(id, {
        attributes: { exclude: ['createdAt', 'updatedAt'] },
        raw: true
      })

      return {
        success: response ? true : false,
        message: response ? 'Lấy thông tin sản phẩm thành công' : 'Không tồn tại sản phẩm này',
        data: response ? response : null
      }
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  async inSertProductSerivce({ body }: { body: any }) {
    try {
      const [data, created] = await db.Product.findOrCreate({
        where: { name: body.name },
        defaults: body
      })

      return {
        success: created ? true : false,
        message: created ? 'Đã thêm sản phẩm thành công' : 'Đã tồn tại tên sản phẩm',
        data: created ? data : null
      }
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  async updateProductSerivce() {
    try {
      return {
        success: true,
        message: 'Sửa sản phẩm thành công'
      }
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  async deleteProductSerivce() {
    try {
      return {
        success: true,
        message: 'Xóa sản phẩm thành công'
      }
    } catch (error: any) {
      throw new Error(error.message)
    }
  }
}

module.exports = new ProductService()
