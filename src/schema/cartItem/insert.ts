const Joi = require('joi')

class InsertCartItemSchema {
  cart_id: number
  product_id: number
  quantity: number

  constructor(data: any) {
    this.cart_id = data.cart_id
    this.product_id = data.product_id
    this.quantity = data.quantity
  }

  static validate(data: any) {
    const schema = Joi.object({
      product_id: Joi.number().integer().required(),
      cart_id: Joi.number().integer().required(),
      quantity: Joi.number().integer().min(1).required()
    })

    return schema.validate(data)
  }
}

module.exports = InsertCartItemSchema
