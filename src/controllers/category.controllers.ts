const { CategoryService } = require('../services')
const HttpStatusCode = require('../constants/HttpStatusCode')
const handleError = require('../utils/utility')

class CategoryController {
  constructor() {}

  async getCategories(req: any, res: any) {
    try {
      const response = await CategoryService.getCategoryService()

      if (response.success === false) return res.status(HttpStatusCode.NOT_FOUND).json(response)

      return res.status(HttpStatusCode.SUCCESS).json(response)
    } catch (error: any) {
      return handleError(res, error)
    }
  }

  async getCategoryById(req: any, res: any) {
    try {
      const response = await CategoryService.getCategoryByIdService()

      if (response.success === false) return res.status(HttpStatusCode.NOT_FOUND).json(response)

      return res.status(HttpStatusCode.SUCCESS).json(response)
    } catch (error: any) {
      return handleError(res, error)
    }
  }

  async insertCategory(req: any, res: any) {
    try {
      const response = await CategoryService.insertCategoryService({
        body: req.body
      })

      if (response.success === false) return res.status(HttpStatusCode.BAD_REQUEST).json(response)

      return res.status(HttpStatusCode.CREATED).json(response)
    } catch (error: any) {
      return handleError(res, error)
    }
  }

  async updateCategory(req: any, res: any) {
    try {
      const response = await CategoryService.updateCategoryService()

      if (response.success === false) return res.status(HttpStatusCode.BAD_REQUEST).json(response)

      return res.status(HttpStatusCode.SUCCESS).json(response)
    } catch (error: any) {
      return handleError(res, error)
    }
  }

  async deleteCategory(req: any, res: any) {
    try {
      const response = await CategoryService.deleteCategoryService()

      if (response.success === false) return res.status(HttpStatusCode.NOT_FOUND).json(response)

      return res.status(HttpStatusCode.SUCCESS).json(response)
    } catch (error: any) {
      return handleError(res, error)
    }
  }
}

module.exports = new CategoryController()
