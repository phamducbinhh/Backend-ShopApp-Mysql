const db = require('../models')

class ProductService {
  constructor() {}

  async getProductSerivce() {
    try {
      const response = await db.Product.findAll({
        raw: true
      })

      return {
        success: response ? true : false,
        message: response ? 'Lấy sản phẩm thành công' : 'Lấy sản phẩm thất bại',
        response
      }
    } catch (error: any) {
      throw new Error(error.message)
    }
  }
  async getProductByIdSerivce() {
    try {
      return {
        success: true,
        message: 'Lấy thông tin sản phẩm'
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
