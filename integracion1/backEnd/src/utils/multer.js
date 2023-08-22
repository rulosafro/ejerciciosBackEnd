const multer = require('multer')
const { dirname } = require('path')
const { logger } = require('../config/logger')
const path = require('path')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === 'profile') {
      cb(null, `${dirname(__dirname)}/files/profiles`)
    } else if (file.fieldname === 'product') {
      cb(null, `${dirname(__dirname)}/files/products`)
    } else if (file.fieldname === 'document') {
      cb(null, `${dirname(__dirname)}/files/documents`)
    } else {
      cb(null, `${dirname(__dirname)}/public/uploads`)
    }
  },
  filename: (req, file, cb) => {
    console.log('🚀 ~ file: multer.js:22 ~ file.fieldname:', file.fieldname)
    if (file.fieldname === 'profile') {
      cb(null, `Profile.${req.user.id}-${Date.now()}-${file.originalname}`)
    } else if (file.fieldname === 'product') {
      cb(null, `Product.${req.user.id}-${Date.now()}-${file.originalname}`)
    } else if (file.fieldname === 'document') {
      cb(null, `Document.${req.user.id}-${Date.now()}-${file.originalname}`)
    } else {
      cb(null, `${Date.now()}-${file.originalname}`)
    }
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
