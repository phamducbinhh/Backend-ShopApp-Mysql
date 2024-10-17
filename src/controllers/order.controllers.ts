const { OrderService } = require('../services')
const HttpStatusCode = require('../constants/HttpStatusCode')
const handleError = require('../utils/utility')

class OrderController {
  constructor() {}

  async getOrders(req: any, res: any) {
    try {
      const response = await OrderService.getOrderService()

      if (response.success === false) return res.status(HttpStatusCode.NOT_FOUND).json(response)

      return res.status(HttpStatusCode.SUCCESS).json(response)
    } catch (error: any) {
      return handleError(res, error)
    }
  }

  async getOrderById(req: any, res: any) {
    try {
      const response = await OrderService.getOrderByIdService({ id: req.params.id })

      if (response.success === false) return res.status(HttpStatusCode.NOT_FOUND).json(response)

      return res.status(HttpStatusCode.SUCCESS).json(response)
    } catch (error: any) {
      return handleError(res, error)
    }
  }

  async insertOrder(req: any, res: any) {
    try {
      const response = await OrderService.insertOrderService({ body: req.body })

      if (response.success === false) return res.status(HttpStatusCode.NOT_FOUND).json(response)

      return res.status(HttpStatusCode.CREATED).json(response)
    } catch (error: any) {
      return handleError(res, error)
    }
  }

  async updateOrder(req: any, res: any) {
    try {
      const response = await OrderService.updateOrderService({
        id: req.params.id,
        body: req.body
      })

      if (response.success === false) return res.status(HttpStatusCode.NOT_FOUND).json(response)

      return res.status(HttpStatusCode.SUCCESS).json(response)
    } catch (error: any) {
      return handleError(res, error)
    }
  }

  async deleteOrder(req: any, res: any) {
    try {
      const response = await OrderService.deleteOrderService({ id: req.params.id })

      if (response.success === false) return res.status(HttpStatusCode.NOT_FOUND).json(response)

      return res.status(HttpStatusCode.SUCCESS).json(response)
    } catch (error: any) {
      return handleError(res, error)
    }
  }
}

module.exports = new OrderController()
