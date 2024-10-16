const { OrderDetailService } = require('../services')
const HttpStatusCode = require('../constants/HttpStatusCode')

class OrderDetailController {
  constructor() {}

  async getOrderDetails(req: any, res: any) {
    try {
      const response = await OrderDetailService.getOrderDetailService()

      if (response.success === false) return res.status(HttpStatusCode.NOT_FOUND).json(response)

      return res.status(HttpStatusCode.SUCCESS).json(response)
    } catch (error: any) {
      return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: error.message
      })
    }
  }

  async getOrderDetailById(req: any, res: any) {
    try {
      const response = await OrderDetailService.getOrderDetailByIdService()

      if (response.success === false) return res.status(HttpStatusCode.NOT_FOUND).json(response)

      return res.status(HttpStatusCode.SUCCESS).json(response)
    } catch (error: any) {
      return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: error.message
      })
    }
  }

  async insertOrderDetail(req: any, res: any) {
    try {
      const response = await OrderDetailService.insertOrderDetailService()

      if (response.success === false) return res.status(HttpStatusCode.NOT_FOUND).json(response)

      return res.status(HttpStatusCode.CREATED).json(response)
    } catch (error: any) {
      return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: error.message
      })
    }
  }

  async updateOrderDetail(req: any, res: any) {
    try {
      const response = await OrderDetailService.updateOrderDetailService()

      if (response.success === false) return res.status(HttpStatusCode.NOT_FOUND).json(response)

      return res.status(HttpStatusCode.SUCCESS).json(response)
    } catch (error: any) {
      return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: error.message
      })
    }
  }

  async deleteOrderDetail(req: any, res: any) {
    try {
      const response = await OrderDetailService.deleteOrderDetailService()

      if (response.success === false) return res.status(HttpStatusCode.NOT_FOUND).json(response)

      return res.status(HttpStatusCode.SUCCESS).json(response)
    } catch (error: any) {
      return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: error.message
      })
    }
  }
}

module.exports = new OrderDetailController()
