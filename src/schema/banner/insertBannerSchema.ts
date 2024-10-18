const Joi = require('joi')

class InsertBannerSchema {
  name: string
  image: string
  status: number
  // product_ids: number[]

  constructor(data: any) {
    this.name = data.name
    this.image = data.image
    this.status = data.status
    // this.product_ids = data.product_ids
  }

  static validate(data: any) {
    const schema = Joi.object({
      name: Joi.string().required(),
      image: Joi.string().uri().optional().allow('', null),
      status: Joi.number().integer().min(1).required(),
      // product_ids: Joi.array().items(Joi.number().integer()).optional()
    })

    return schema.validate(data)
  }
}

module.exports = InsertBannerSchema
