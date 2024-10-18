const Joi = require('joi')

class InsertProductImageSchema {
  image_url: string
  product_id: number

  constructor(data: any) {
    this.image_url = data.image_url
    this.product_id = data.product_id
  }

  static validate(data: any) {
    const schema = Joi.object({
      product_id: Joi.number().integer().required(),
      image_url: Joi.string().required()
    })

    return schema.validate(data)
  }
}

module.exports = InsertProductImageSchema
