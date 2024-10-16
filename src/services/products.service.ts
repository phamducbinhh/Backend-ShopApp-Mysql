const db = require('../models')

class ProductService {
  constructor() {}

  async getProductSerivce() {
    try {
      return {
        success: true,
        message: 'Lấy sản phẩm thành công'
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

      if (!created) {
        return {
          success: false,
          message: 'Đã tồn tại tên sản phẩm'
        }
      }

      return {
        success: true,
        message: 'Thêm mới sản phẩm thành công',
        data
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
