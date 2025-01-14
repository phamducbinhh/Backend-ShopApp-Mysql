const Joi = require('joi')
const bcrypt = require('bcrypt')

class InsertUserSchema {
  email: string
  password: string
  name: string
  avatar: string
  phone: string | number

  constructor(data: any) {
    this.email = data.email
    this.password = this.hashPassword(data.password)
    this.name = data.name
    this.avatar = data.avatar
    this.phone = data.phone
  }

  hashPassword(password: string) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(12))
  }

  static validate(data: any) {
    const schema = Joi.object({
      email: Joi.string().email().required(), // Email là chuỗi hợp lệ và bắt buộc
      password: Joi.string().min(6).required(), // Mật khẩu tối thiểu 6 ký tự và bắt buộc
      name: Joi.string().required(), // Tên là chuỗi và bắt buộc
      avatar: Joi.string().uri().allow('').optional(), // Đường dẫn ảnh hợp lệ hoặc có thể là chuỗi rỗng
      phone: Joi.string().optional() // Số điện thoại là số nguyên và tùy chọn
    })

    return schema.validate(data)
  }
}

module.exports = InsertUserSchema
