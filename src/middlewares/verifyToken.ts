const jwt = require('jsonwebtoken')
const HttpStatusCode = require('../constants/HttpStatusCode')

const verifyToken = async (req: any, res: any, next: any) => {
  const token = req.cookies?.token ? req.cookies?.token : req.headers?.authorization?.split(' ')[1]

  if (!token) {
    return res.status(HttpStatusCode.UNAUTHORIZED).json({
      success: false,
      message: 'Không có token, truy cập bị từ chối'
    })
  }
  try {
    const jwtObject = jwt.verify(token, process.env.JWT_SECRET_KEY)
    const isExpired = Date.now() >= jwtObject.exp * 1000
    if (isExpired) {
      res.status(HttpStatusCode.BAD_REQUEST).json({
        message: 'Token hết hạn'
      })
      res.end()
    } else {
      next()
    }
  } catch (error: any) {
    return res.status(HttpStatusCode.BAD_REQUEST).json({
      message: error.message
    })
  }
}

module.exports = verifyToken
