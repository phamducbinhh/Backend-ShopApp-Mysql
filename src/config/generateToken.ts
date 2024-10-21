const jwt = require('jsonwebtoken')

const generateToken = (id: string | number) => {
  return jwt.sign({ id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES_IN || '2d'
  })
}

module.exports = { generateToken }
