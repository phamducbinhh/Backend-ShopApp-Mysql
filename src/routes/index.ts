const productRouter = require('./products.routes')

const initRoutes = (app: any): void => {
  app.use('/api/v1/products', productRouter)
}

module.exports = initRoutes
