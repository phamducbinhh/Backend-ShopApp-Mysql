const productRouter = require('./products.routes')
const categoryRouter = require('./category.routes')
const brandRouter = require('./brand.routes')
const orderRouter = require('./order.routes')


const initRoutes = (app: any): void => {
  app.use('/api/v1/products', productRouter)
  app.use('/api/v1/categories', categoryRouter)
  app.use('/api/v1/brands', brandRouter)
  app.use('/api/v1/orders', orderRouter)
}

module.exports = initRoutes