const Joi = require('joi')

class InsertOrderSchema {
  user_id: string | number
  status: string | number
  note: string
  total: string | number

  constructor(data: any) {
    this.user_id = data.user_id
    this.status = data.status
    this.note = data.note
    this.total = data.total
  }

  static validate(data: any) {
    const schema = Joi.object({
      user_id: Joi.number().integer().required(),
      status: Joi.number().integer().min(1).required(),
      note: Joi.string().optional().allow(''),
      total: Joi.number().integer().min(0).required()
    })

    return schema.validate(data)
  }
}

module.exports = InsertOrderSchema
