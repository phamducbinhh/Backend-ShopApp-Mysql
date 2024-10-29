const db = require('../models')
const ResponseUser = require('../response/user/ResponseUser')
const InsertUserSchema = require('../schema/user/insertUserSchema')

class UserService {
  constructor() {}

  async getUserService(req: any) {
    const page = parseInt(req.query.page || 1)
    const limit = parseInt(req.query.limit || 10)
    const offset = (page - 1) * limit
    const search = req.query.search || ''
    try {
      const { rows, count } = await db.User.findAndCountAll({
        where: {
          [db.Sequelize.Op.or]: [
            {
              name: {
                [db.Sequelize.Op.like]: `%${search}%`
              }
            },
            {
              email: {
                [db.Sequelize.Op.like]: `%${search}%`
              }
            }
          ]
        },
        attributes: { exclude: ['createdAt', 'updatedAt', 'password'] },
        limit,
        offset,
        raw: true
      })

      return {
        success: rows ? true : false,
        message: rows ? 'Lấy người dùng thành công' : 'Lấy người dùng thất bại',
        data: {
          totalItems: count,
          itemsPerPage: limit,
          currentPage: page,
          totalPages: Math.ceil(count / limit),
          items: rows
        }
      }
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  async getUserByIdService({ id }: { id: string }) {
    try {
      const response = await db.User.findByPk(id, {
        attributes: { exclude: ['createdAt', 'updatedAt', 'password'] },
        raw: true
      })

      return {
        success: response ? true : false,
        message: response ? 'Lấy thông tin người dùng thành công' : 'Không tồn tại người dùng này',
        data: response ? response : null
      }
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  async insertUserService({ body }: { body: any }) {
    try {
      const [data, created] = await db.User.findOrCreate({
        where: { email: body.email },
        defaults: new InsertUserSchema(body)
      })

      return {
        success: created ? true : false,
        message: created ? 'Đã thêm người dùng thành công' : 'Đã tồn tại người dùng với email này',
        data: created ? new ResponseUser(data) : null
      }
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  async updateUserService({ id, body }: { id: string; body: any }) {
    try {
      const response = await db.User.update(body, {
        where: { id }
      })
      return {
        success: response[0] > 0,
        message: response[0] > 0 ? 'Sửa người dùng thành công' : 'Người dùng không tồn tại'
      }
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  async deleteUserService({ id }: { id: string }) {
    try {
      const response = await db.User.destroy({
        where: { id }
      })

      return {
        success: response ? true : false,
        message: response ? 'Xóa người dùng thành công' : 'Không tìm thấy người dùng để xóa'
      }
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  async getCurrentUser(id: string) {
    try {
      const response = await db.User.findOne({
        where: { id },
        attributes: ['id', 'name', 'email', 'avatar', 'role', 'phone']
      })

      return {
        success: response ? true : false,
        message: response ? 'OK' : 'người dùng không tồn tại',
        data: response
      }
    } catch (error: any) {
      throw new Error(error.message)
    }
  }
  async updateCurrentUser(id: string, body: any) {
    const { name, avatar } = body
    try {
      const user = await db.User.findOne({
        where: { id }
      })

      user.name = name || user.name
      user.avatar = avatar || user.avatar

      await user.save()

      return {
        success: user ? true : false,
        message: user ? 'OK' : 'người dùng không tồn tại',
        data: user
      }
    } catch (error: any) {
      throw new Error(error.message)
    }
  }
}

module.exports = new UserService()
