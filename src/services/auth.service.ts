const bcrypt = require('bcrypt')
const db = require('../models')
const { generateToken } = require('../config/generateToken')

class AuthService {
  constructor() {}

  hashPassword(password: string) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(12))
  }

  comparePassword(password: string, hashedPassword: string) {
    return bcrypt.compareSync(password, hashedPassword)
  }

  async login({ body }: { body: any }, res: any) {
    const { email, password } = body
    try {
      const user = await db.User.findOne({
        where: { email }
      })

      if (!user) {
        return {
          success: false,
          message: 'Email không tồn tại trong hệ thống'
        }
      }

      if (!user.password) {
        return {
          success: false,
          message: 'Người dùng đã đăng ký bằng Google/Facebook. Vui lòng đăng nhập bằng Google/Facebook.'
        }
      }

      const isPasswordValid = this.comparePassword(password, user.password)

      if (!isPasswordValid) {
        return {
          success: false,
          message: 'Mật khẩu không chính xác',
          token: null
        }
      }
      const token = generateToken(user.id)

      // Lưu token vào cookie
      res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 2 * 24 * 60 * 60 * 1000
      })

      return {
        success: true,
        message: 'Đăng nhập thành công',
        token: token || null
      }
    } catch (error: any) {
      throw new Error(error.message)
    }
  }
}

module.exports = new AuthService()
