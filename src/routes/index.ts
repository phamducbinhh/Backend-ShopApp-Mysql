const productRouter = require('./products.routes')
const productImageRouter = require('./productImage.routes')
const categoryRouter = require('./category.routes')
const brandRouter = require('./brand.routes')
const orderRouter = require('./order.routes')
const orderDetailRouter = require('./orderDetail.routes')
const userRouter = require('./user.routes')
const newsRouter = require('./news.routes')
const newsDetailRouter = require('./news_detail.routes')
const bannerRouter = require('./banner.routes')
const bannerDetailRouter = require('./banner_detail.routes')
const uploadRouter = require('./upload.routes')

const initRoutes = (app: any): void => {
  app.use('/api/v1/products', productRouter)
  app.use('/api/v1/products-image', productImageRouter)
  app.use('/api/v1/categories', categoryRouter)
  app.use('/api/v1/brands', brandRouter)
  app.use('/api/v1/orders', orderRouter)
  app.use('/api/v1/order-details', orderDetailRouter)
  app.use('/api/v1/user', userRouter)
  app.use('/api/v1/news', newsRouter)
  app.use('/api/v1/news-details', newsDetailRouter)
  app.use('/api/v1/banners', bannerRouter)
  app.use('/api/v1/banners-details', bannerDetailRouter)
  app.use('/api/v1/upload-images', uploadRouter)
}

module.exports = initRoutes
