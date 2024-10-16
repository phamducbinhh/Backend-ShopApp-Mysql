const { OrderDetailService } = require('../services')
const HttpStatusCode = require('../constants/HttpStatusCode')
const handleError = require('../utils/utility')

class OrderDetailController {
  constructor() {}

  async getOrderDetails(req: any, res: any) {
    try {
      const response = await OrderDetailService.getOrderDetailService()

      if (response.success === false) return res.status(HttpStatusCode.NOT_FOUND).json(response)

      return res.status(HttpStatusCode.SUCCESS).json(response)
    } catch (error: any) {
      return handleError(res, error)
    }
  }

  async getOrderDetailById(req: any, res: any) {
    try {
      const response = await OrderDetailService.getOrderDetailByIdService()

      if (response.success === false) return res.status(HttpStatusCode.NOT_FOUND).json(response)

      return res.status(HttpStatusCode.SUCCESS).json(response)
    } catch (error: any) {
      return handleError(res, error)
    }
  }

  async insertOrderDetail(req: any, res: any) {
    try {
      const response = await OrderDetailService.insertOrderDetailService()

      if (response.success === false) return res.status(HttpStatusCode.NOT_FOUND).json(response)

      return res.status(HttpStatusCode.CREATED).json(response)
    } catch (error: any) {
      return handleError(res, error)
    }
  }

  async updateOrderDetail(req: any, res: any) {
    try {
      const response = await OrderDetailService.updateOrderDetailService()

      if (response.success === false) return res.status(HttpStatusCode.NOT_FOUND).json(response)

      return res.status(HttpStatusCode.SUCCESS).json(response)
    } catch (error: any) {
      return handleError(res, error)
    }
  }

  async deleteOrderDetail(req: any, res: any) {
    try {
      const response = await OrderDetailService.deleteOrderDetailService()

      if (response.success === false) return res.status(HttpStatusCode.NOT_FOUND).json(response)

      return res.status(HttpStatusCode.SUCCESS).json(response)
    } catch (error: any) {
      return handleError(res, error)
    }
  }
}

module.exports = new OrderDetailController()
