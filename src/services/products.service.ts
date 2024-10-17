const db = require('../models')

class ProductService {
  constructor() {}

  async getProductSerivce() {
    try {
      const response = await db.Product.findAll({
        attributes: { exclude: ['createdAt', 'updatedAt'] },
        raw: true
      })

      return {
        success: response ? true : false,
        message: response ? 'Lấy sản phẩm thành công' : 'Lấy sản phẩm thất bại',
        data: response ? response : null
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
