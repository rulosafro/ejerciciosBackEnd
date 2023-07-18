const multer = require('multer')
const { dirname } = require('path')
const { logger } = require('../config/logger')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, `${dirname(__dirname)}/public/uploads`)
  },
  filename: (req, file, callback) => {
    callback(null, `${Date.now()}-${file.originalname}`)
  }
})

const uploader = multer({
  storage,
  onError: (err, next) => {
    logger.info(err)
    next(err)
  }
})

module.exports = {
  uploader
}
