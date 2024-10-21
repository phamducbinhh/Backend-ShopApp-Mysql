import { ROLE } from '~/constants/role'
const bcrypt = require('bcrypt')
const db = require('../models')
const { generateToken } = require('../config/generateToken')

const TOKEN_EXPIRY = 2 * 24 * 60 * 60 * 1000

class AuthService {
  hashPassword(password: string) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(12))
  }

  comparePassword(password: string, hashedPassword: string) {
    return bcrypt.compareSync(password, hashedPassword)
  }

  setTokenCookie(res: any, token: string) {
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: TOKEN_EXPIRY
    })
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
        return { success: false, message: 'Email hoặc số điện thoại không tồn tại trong hệ thống' }
      }

      if (!user.password) {
        return { success: false, message: 'Vui lòng đăng nhập bằng Google/Facebook.' }
      }

      if (!this.comparePassword(password, user.password)) {
        return { success: false, message: 'Mật khẩu không chính xác' }
      }

      const token = generateToken(user.id)
      this.setTokenCookie(res, token)

      return { success: true, message: 'Đăng nhập thành công', token }
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  async register({ body }: { body: any }, res: any) {
    const { email, password, phone, name, avatar } = body

    try {
      const userExists = await db.User.findOne({
        where: { [db.Sequelize.Op.or]: [{ email }, { phone }] }
      })

      if (userExists) {
        const existingField = userExists.email === email ? 'Email' : 'Số điện thoại'
        return { success: false, message: `${existingField} đã tồn tại trong hệ thống` }
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
      this.setTokenCookie(res, token)

      return { success: true, message: 'Đăng ký thành công', token }
    } catch (error: any) {
      throw new Error(error.message)
    }
  }
}

module.exports = new AuthService()
