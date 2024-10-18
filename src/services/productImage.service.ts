const db = require('../models') // Sử dụng model Sequelize cho cơ sở dữ liệu

class ProductImageService {
  constructor() {}

  // Lấy danh sách các ảnh sản phẩm có phân trang
  async getProductImagesService(req: any) {
    const page = parseInt(req.query.page || 1)
    const limit = parseInt(req.query.limit || 10)
    const offset = (page - 1) * limit

    try {
      const whereCondition = req.query.product_id ? { product_id: req.query.product_id } : {}

      const { rows, count } = await db.ProductImage.findAndCountAll({
        where: whereCondition,
        include: [
          {
            model: db.Product,
            as: 'product',
            attributes: ['id', 'name']
          }
        ],
        limit,
        offset
      })

      return {
        success: rows.length > 0,
        message: rows.length > 0 ? 'Lấy danh sách ảnh sản phẩm thành công' : 'Không tìm thấy ảnh sản phẩm',
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

  // Lấy ảnh sản phẩm theo id
  async getProductImageByIdService({ id }: { id: string }) {
    try {
      const response = await db.ProductImage.findByPk(id, {
        include: [
          {
            model: db.Product,
            as: 'product',
            attributes: { exclude: ['createdAt', 'updatedAt'] }
          }
        ]
      })

      return {
        success: response ? true : false,
        message: response ? 'Lấy thông tin ảnh sản phẩm thành công' : 'Không tìm thấy ảnh sản phẩm',
        data: response || null
      }
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  // Thêm ảnh sản phẩm mới
  async insertProductImageService({ body }: { body: any }) {
    const { product_id, image_url } = body

    try {
      const productExists = await db.Product.findByPk(product_id)
      if (!productExists) {
        return {
          success: false,
          message: 'Sản phẩm không tồn tại'
        }
      }

      // Tìm hoặc tạo ảnh sản phẩm
      const [response, created] = await db.ProductImage.findOrCreate({
        where: { product_id, image_url },
        defaults: { product_id, image_url }
      })

      if (!created) {
        return {
          success: false,
          message: 'Ảnh sản phẩm đã tồn tại'
        }
      }

      return {
        success: true,
        message: 'Thêm ảnh sản phẩm thành công',
        data: response
      }
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  // Cập nhật ảnh sản phẩm
  async updateProductImageService({ id, body }: { id: string; body: any }) {
    const { product_id, image_url } = body

    try {
      const productExists = await db.Product.findByPk(product_id)
      if (!productExists) {
        return {
          success: false,
          message: 'Sản phẩm không tồn tại'
        }
      }

      const response = await db.ProductImage.update(
        { image_url },
        {
          where: { id }
        }
      )

      return {
        success: response[0] > 0,
        message: response[0] > 0 ? 'Cập nhật ảnh sản phẩm thành công' : 'Cập nhật ảnh sản phẩm thất bại'
      }
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  // Xóa ảnh sản phẩm
  async deleteProductImageService({ id }: { id: string }) {
    try {
      const response = await db.ProductImage.destroy({
        where: { id }
      })

      return {
        success: response > 0,
        message: response > 0 ? 'Xóa ảnh sản phẩm thành công' : 'Không tìm thấy ảnh sản phẩm để xóa'
      }
    } catch (error: any) {
      throw new Error(error.message)
    }
  }
}

module.exports = new ProductImageService()
