const Joi = require('joi')
const bcrypt = require('bcrypt')

class LoginUserSchema {
  email: string
  password: string
  phone: string | number

  constructor(data: any) {
    this.email = data.email
    this.password = this.hashPassword(data.password)
    this.phone = data.phone
  }

  hashPassword(password: string) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(12))
  }

  static validate(data: any) {
    const schema = Joi.object({
      email: Joi.string().email().optional(),
      password: Joi.string().min(6).required(),
      phone: Joi.string().optional()
    })

    return schema.validate(data)
  }
}

module.exports = LoginUserSchema
