const productRouter = require('./products.routes')
const categoryRouter = require('./category.routes')
const brandRouter = require('./brand.routes')
const orderRouter = require('./order.routes')
const orderDetailRouter = require('./orderDetail.routes')
const userRouter = require('./user.routes')
const newsRouter = require('./news.routes')
const newsDetailRouter = require('./news_detail.routes')

const initRoutes = (app: any): void => {
  app.use('/api/v1/products', productRouter)
  app.use('/api/v1/categories', categoryRouter)
  app.use('/api/v1/brands', brandRouter)
  app.use('/api/v1/orders', orderRouter)
  app.use('/api/v1/order-details', orderDetailRouter)
  app.use('/api/v1/user', userRouter)
  app.use('/api/v1/news', newsRouter)
  app.use('/api/v1/news-details', newsDetailRouter)
}

module.exports = initRoutes
