const { UserService } = require('../services')
const HttpStatusCode = require('../constants/HttpStatusCode')
const handleError = require('../utils/utility')

class UserController {
  constructor() {}

  async getUsers(req: any, res: any) {
    try {
      const response = await UserService.getUserService(req)

      if (response.success === false) return res.status(HttpStatusCode.NOT_FOUND).json(response)

      return res.status(HttpStatusCode.SUCCESS).json(response)
    } catch (error: any) {
      return handleError(res, error)
    }
  }

  async getUserById(req: any, res: any) {
    try {
      const response = await UserService.getUserByIdService({ id: req.params.id })

      if (response.success === false) return res.status(HttpStatusCode.NOT_FOUND).json(response)

      return res.status(HttpStatusCode.SUCCESS).json(response)
    } catch (error: any) {
      return handleError(res, error)
    }
  }

  async insertUser(req: any, res: any) {
    try {
      const response = await UserService.insertUserService({
        body: req.body
      })

      if (response.success === false) return res.status(HttpStatusCode.CONFLICT).json(response)

      return res.status(HttpStatusCode.CREATED).json(response)
    } catch (error: any) {
      return handleError(res, error)
    }
  }

  async updateUser(req: any, res: any) {
    try {
      const response = await UserService.updateUserService({
        id: req.params.id,
        body: req.body
      })

      if (response.success === false) return res.status(HttpStatusCode.BAD_REQUEST).json(response)

      return res.status(HttpStatusCode.SUCCESS).json(response)
    } catch (error: any) {
      return handleError(res, error)
    }
  }

  async deleteUser(req: any, res: any) {
    try {
      const response = await UserService.deleteUserService({ id: req.params.id })

      if (response.success === false) return res.status(HttpStatusCode.NOT_FOUND).json(response)

      return res.status(HttpStatusCode.SUCCESS).json(response)
    } catch (error: any) {
      return handleError(res, error)
    }
  }
}

module.exports = new UserController()
