const express = require('express')
const { connectDatabase } = require('./config/connectDatabase')
const cors = require('cors')
const app = express()
const cookieParser = require('cookie-parser')
const initRoutes = require('./routes')
require('dotenv').config()

const corsOptions = {
  origin: ['https://local.oeg.vn'],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  preflightContinue: false,
  credentials: true,
  optionsSuccessStatus: 204
}

app.use(cors(corsOptions))

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
