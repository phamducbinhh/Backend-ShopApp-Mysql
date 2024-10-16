const productRouter = require('./products.routes')
const categoryRouter = require('./category.routes')

const initRoutes = (app: any): void => {
  app.use('/api/v1/products', productRouter)
  app.use('/api/v1/categories', categoryRouter)
}

module.exports = initRoutes
