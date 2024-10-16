const Joi = require('joi')

class ProductSchema {
  name: string
  image: string
  price: string | number
  oldprice: string | number
  description: string
  specification: string
  buyturn: string | number
  quantity: string | number
  brand_id: string | number
  category_id: string | number
  constructor(data: any) {
    this.name = data.name
    this.price = data.price
    this.image = data.image
    this.oldprice = data.oldprice
    this.description = data.description
    this.oldprice = data.oldprice
    this.specification = data.specification
    this.buyturn = data.buyturn
    this.quantity = data.quantity
    this.brand_id = data.brand_id
    this.category_id = data.category_id
  }

  static validate(data: any) {
    const schema = Joi.object({
      name: Joi.string().required(), // Tên sản phẩm là chuỗi và bắt buộc
      price: Joi.number().positive().required(), // Giá sản phẩm là số dương và bắt buộc
      oldprice: Joi.number().positive(), // Giá cũ là số dương (không bắt buộc)
      image: Joi.string().uri().allow(''), // Đường dẫn ảnh hợp lệ hoặc có thể là chuỗi rỗng
      description: Joi.string().optional(), // Mô tả sản phẩm là chuỗi tùy chọn
      specification: Joi.string().required(), // Thông số kỹ thuật là chuỗi và bắt buộc
      buyturn: Joi.number().integer().min(0), // Lượt mua là số nguyên không âm
      quantity: Joi.number().integer().min(0), // Số lượng là số nguyên không âm
      brand_id: Joi.number().integer().required(), // ID của nhãn hiệu là số nguyên và bắt buộc
      category_id: Joi.number().integer().required() // ID của danh mục là số nguyên và bắt buộc
    })

    return schema.validate(data)
  }
}

module.exports = ProductSchema
