const Joi = require('joi')

class InsertBannerDetailSchema {
  banner_id: number
  product_id: number

  constructor(data: any) {
    this.banner_id = data.banner_id
    this.product_id = data.product_id
  }

  static validate(data: any) {
    const schema = Joi.object({
      product_id: Joi.number().integer().required(),
      banner_id: Joi.number().integer().required()
    })

    return schema.validate(data)
  }
}

module.exports = InsertBannerDetailSchema
