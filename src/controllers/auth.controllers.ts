const { AuthService } = require('../services')
const HttpStatusCode = require('../constants/HttpStatusCode')
const handleError = require('../utils/utility')

class AuthController {
  constructor() {}

  async login(req: any, res: any) {
    try {
      const response = await AuthService.login({ body: req.body }, res)
      if (response.success === false) return res.status(HttpStatusCode.NOT_FOUND).json(response)

      return res.status(HttpStatusCode.SUCCESS).json(response)
    } catch (error: any) {
      return handleError(res, error)
    }
  }

  async logout(req: any, res: any) {
    try {
      res.clearCookie('token')
      return res.status(HttpStatusCode.SUCCESS).json({
        success: true,
        message: 'Logout successfully'
      })
    } catch (error: any) {
      return handleError(res, error)
    }
  }
}

module.exports = new AuthController()
