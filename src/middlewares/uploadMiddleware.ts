const multer = require('multer')
const path = require('path')

// Cấu hình bộ nhớ cho multer
const storage = multer.diskStorage({
  destination: function (req: any, file: any, cb: any) {
    const basePath = path.join(__dirname, '../uploads/')
    cb(null, basePath)
  },
  filename: function (req: any, file: any, cb: any) {
    cb(null, Date.now() + '-' + file.originalname) // Đặt tên file
  }
})

// Kiểm tra file ảnh và dung lượng <= 5MB
const imageFilter = (req: any, file: any, cb: any) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true)
  } else {
    cb(new Error('Chi được upload ảnh'), false)
  }
}

// Middleware upload ảnh (tối đa 5 ảnh, dung lượng <= 5MB)
const uploadMiddleware = multer({
  storage: storage,
  fileFilter: imageFilter,
  limits: { fileSize: 5 * 1024 * 1024 } // Giới hạn dung lượng <= 5MB
}) // Cho phép upload tối đa 5 ảnh

module.exports = uploadMiddleware
