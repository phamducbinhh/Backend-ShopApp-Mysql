const db = require('../models')

class BrandService {
  constructor() {}

  async getBrandService() {
    try {
      return {
        success: true,
        message: 'Lấy thương hiệu thành công'
      }
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  async getBrandByIdService() {
    try {
      return {
        success: true,
        message: 'Lấy thông tin thương hiệu thành công'
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

      if (!created) {
        return {
          success: false,
          message: 'Tên thương hiệu đã tồn tại'
        }
      }

      return {
        success: true,
        message: 'Thêm mới thương hiệu thành công',
        data: data
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
