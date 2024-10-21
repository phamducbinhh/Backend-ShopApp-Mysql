import { ROLE } from '~/constants/role'

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
    const { email, password, phone } = body
    try {
      const user = await db.User.findOne({
        where: {
          [db.Sequelize.Op.or]: [email ? { email } : null, phone ? { phone } : null]
        }
      })

      if (!user) {
        return {
          success: false,
          message: 'Email hoặc số điện thoại không tồn tại trong hệ thống'
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

  async register({ body }: { body: any }, res: any) {
    const { email, password, phone, name, avatar } = body
    try {
      const userExists = await db.User.findOne({
        where: {
          [db.Sequelize.Op.or]: [{ email }, { phone }]
        }
      })

      if (userExists) {
        const existingField = userExists.email === email ? 'Email' : 'Số điện thoại'
        return {
          success: false,
          message: `${existingField} đã tồn tại trong hệ thống`,
          token: null
        }
      }

      const user = await db.User.create({
        email,
        phone,
        name,
        avatar,
        role: ROLE.USER,
        password: this.hashPassword(password)
      })

      const token = generateToken(user.id)

      res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 2 * 24 * 60 * 60 * 1000 // 2 ngày
      })

      return {
        success: true,
        message: 'Đăng ký thành công',
        token: token || null
      }
    } catch (error: any) {
      throw new Error(error.message)
    }
  }
}

module.exports = new AuthService()
