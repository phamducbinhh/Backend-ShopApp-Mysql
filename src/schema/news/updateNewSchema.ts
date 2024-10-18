const Joi = require('joi')

class UpdateNewSchema {
  title: string
  image: string
  content: string
  product_ids: number[]

  constructor(data: any) {
    this.title = data.title
    this.image = data.image
    this.content = data.content
    this.product_ids = data.product_ids
  }

  static validate(data: any) {
    const schema = Joi.object({
      title: Joi.string().optional().allow(null), // Tên (title) là chuỗi và bắt buộc
      image: Joi.string().uri().allow('', null).optional(), // Ảnh (image) có thể là URI hoặc chuỗi rỗng, và là tùy chọn
      content: Joi.string().optional().allow(null), // Nội dung (content) là chuỗi và bắt buộc
      product_ids: Joi.array().items(Joi.number().integer()).optional().allow(null) // Danh sách các số nguyên (product_ids)
    })

    return schema.validate(data)
  }
}

module.exports = UpdateNewSchema
