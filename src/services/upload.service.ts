const path = require('path')
class ImageService {
  constructor() {}

  async handleUpload(req: any) {
    try {
      if (!req.files || req.files.length === 0) {
        return {
          success: false,
          message: 'Không có file ảnh nào được upload'
        }
      }

      const filePaths = req.files.map((file: any) => path.basename(file.path))
      return {
        success: true,
        message: 'Upload ảnh thành công',
        data: filePaths
      }
    } catch (error: any) {
      throw new Error(error.message)
    }
  }
}

module.exports = new ImageService()
