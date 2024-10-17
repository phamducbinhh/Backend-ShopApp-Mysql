const Joi = require('joi')

class ProductUpdateSchema {
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
    // tất cả các trường hợp có thể null
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
    // tuy nhiên nếu có giá trị thì phải validate
    const schema = Joi.object({
      name: Joi.string().optional(),
      price: Joi.number().positive().optional(),
      oldprice: Joi.number().positive().optional(),
      image: Joi.string().uri().allow(''),
      description: Joi.string().optional(),
      specification: Joi.string().optional(),
      buyturn: Joi.number().integer().min(0),
      quantity: Joi.number().integer().min(0),
      brand_id: Joi.number().integer().optional(),
      category_id: Joi.number().integer().optional()
    })

    return schema.validate(data)
  }
}

module.exports = ProductUpdateSchema
