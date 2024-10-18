const Joi = require('joi')

class InsertCartSchema {
  user_id: number
  session_id: string

  constructor(data: any) {
    this.user_id = data.user_id
    this.session_id = data.session_id
  }

  static validate(data: any) {
    const schema = Joi.object({
      session_id: Joi.string().required(),
      user_id: Joi.number().integer().optional()
    })

    return schema.validate(data)
  }
}

module.exports = InsertCartSchema
