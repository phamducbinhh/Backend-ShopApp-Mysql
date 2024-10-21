const jwt = require('jsonwebtoken')
const HttpStatusCode = require('../constants/HttpStatusCode')
const db = require('../models')

// Hàm phụ để kiểm tra token và lấy thông tin người dùng
const getUserFromToken = async (req: any, res: any) => {
  const token = req.cookies?.token || req.headers?.authorization?.split(' ')[1]

  if (!token) {
    return res.status(HttpStatusCode.UNAUTHORIZED).json({
      success: false,
      message: 'Không có token, truy cập bị từ chối'
    })
  }

  try {
    const jwtObject = jwt.verify(token, process.env.JWT_SECRET_KEY)

    // Kiểm tra xem token có hết hạn không
    const isExpired = Date.now() >= jwtObject.exp * 1000
    if (isExpired) {
      return res.status(HttpStatusCode.BAD_REQUEST).json({
        message: 'Token hết hạn'
      })
    }

    const user = await db.User.findOne({
      where: { id: jwtObject.id }
    })

    if (!user) {
      return res.status(HttpStatusCode.NOT_FOUND).json({
        success: false,
        message: 'Người dùng không tồn tại'
      })
    }

    return { user }
  } catch (error: any) {
    return res.status(HttpStatusCode.BAD_REQUEST).json({
      message: error.message
    })
  }
}

// Middleware kiểm tra token
const verifyToken = async (req: any, res: any, next: any) => {
  const result = await getUserFromToken(req, res)
  if (result?.user) {
    req.user = result.user
    next()
  }
}

// Middleware kiểm tra quyền truy cập dựa trên vai trò
const verifyRole = (rolesRequired: any) => {
  return async (req: any, res: any, next: any) => {
    const result = await getUserFromToken(req, res)
    if (result?.user) {
      const { user } = result
      if (!rolesRequired.includes(user.role)) {
        return res.status(HttpStatusCode.FORBIDEN).json({
          success: false,
          message: 'Không có quyền truy cập'
        })
      }
      req.user = user
      next()
    }
  }
}

module.exports = { verifyToken, verifyRole }
