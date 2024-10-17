const Joi = require('joi')

class InsertUserSchema {
  email: string
  password: string
  name: string
  role: string | number
  avatar: string
  phone: string | number

  constructor(data: any) {
    this.email = data.email
    this.password = data.password
    this.name = data.name
    this.role = data.role
    this.avatar = data.avatar
    this.phone = data.phone
  }

  static validate(data: any) {
    const schema = Joi.object({
      email: Joi.string().email().required(), // Email là chuỗi hợp lệ và bắt buộc
      password: Joi.string().min(6).required(), // Mật khẩu tối thiểu 6 ký tự và bắt buộc
      name: Joi.string().required(), // Tên là chuỗi và bắt buộc
      role: Joi.number().integer().required(), // Vai trò là số nguyên và bắt buộc
      avatar: Joi.string().uri().allow(''), // Đường dẫn ảnh hợp lệ hoặc có thể là chuỗi rỗng
      phone: Joi.number().integer().optional() // Số điện thoại là số nguyên và tùy chọn
    })

    return schema.validate(data)
  }
}

module.exports = InsertUserSchema
