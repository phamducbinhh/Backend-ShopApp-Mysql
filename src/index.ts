const express = require('express')
const { connectDatabase } = require('./config/connectDatabase')
const cors = require('cors')
const app = express()
const cookieParser = require('cookie-parser')
const initRoutes = require('./routes')
require('dotenv').config()

const allowedOrigins = ['http://localhost:3002']
app.use(
  cors({
    origin: allowedOrigins,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true
  })
)

app.use(express.json())

app.use(cookieParser())

app.use(express.urlencoded({ extended: true }))

initRoutes(app)

const startServer = async () => {
  try {
    await connectDatabase()

    app.listen(process.env.PORT, () => {
      console.log(`App server listening on port: ${process.env.PORT || 4000}`)
    })
  } catch (err: any) {
    console.error('App server error:', err.stack)
  }
}

startServer()
