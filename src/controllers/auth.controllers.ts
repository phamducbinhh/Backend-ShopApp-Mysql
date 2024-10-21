const { AuthService } = require('../services')
const HttpStatusCode = require('../constants/HttpStatusCode')

class AuthController {
  constructor() {}

  async login(req: any, res: any) {
    try {
      const response = await AuthService.login({ body: req.body }, res)
      if (response.success === false) return res.status(HttpStatusCode.NOT_FOUND).json(response)

      return res.status(HttpStatusCode.SUCCESS).json(response)
    } catch (error: any) {
      return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: error.message
      })
    }
  }
}

module.exports = new AuthController()
