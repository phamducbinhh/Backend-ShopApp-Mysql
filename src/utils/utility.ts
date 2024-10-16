const HttpStatusCode = require('../constants/HttpStatusCode')

function handleError(res: any, error: any) {
  return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
    success: false,
    message: error.message
  })
}

module.exports = handleError