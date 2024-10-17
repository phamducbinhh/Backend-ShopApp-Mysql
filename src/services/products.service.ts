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

  async updateProductSerivce({ id, body }: { id: string; body: any }) {
    try {
      const response = await db.Product.update(body, {
        where: { id }
      })
      return {
        success: response[0] > 0,
        message: response[0] > 0 ? 'Sửa sản phẩm thành công' : 'Sản phẩm không tồn tại',
        data: response[0] > 0 ? body : null
      }
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  async deleteProductSerivce({ id }: { id: string }) {
    try {
      const response = await db.Product.destroy({
        where: { id }
      })

      return {
        success: response ? true : false,
        message: response ? 'Xóa sản phẩm thành công' : 'Không tìm thấy sản phẩm để xóa'
      }
    } catch (error: any) {
      throw new Error(error.message)
    }
  }
}

module.exports = new ProductService()
