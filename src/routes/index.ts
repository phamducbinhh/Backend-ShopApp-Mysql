const productRouter = require('./products.routes')
const categoryRouter = require('./category.routes')
const brandRouter = require('./brand.routes')


const initRoutes = (app: any): void => {
  app.use('/api/v1/products', productRouter)
  app.use('/api/v1/categories', categoryRouter)
  app.use('/api/v1/brands', brandRouter)
}

module.exports = initRoutes
