const Joi = require('joi')

class InsertNewDetailSchema {
  news_id: number
  product_id: number

  constructor(data: any) {
    this.news_id = data.news_id
    this.product_id = data.product_id
  }

  static validate(data: any) {
    const schema = Joi.object({
      product_id: Joi.number().integer().required(),
      news_id: Joi.number().integer().required()
    })

    return schema.validate(data)
  }
}

module.exports = InsertNewDetailSchema
