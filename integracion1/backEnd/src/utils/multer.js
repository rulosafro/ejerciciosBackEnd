const multer = require('multer')
const { dirname } = require('path')
const { logger } = require('../config/logger')
const { userService } = require('../controllers/users.controller')

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
      const nameDoc = `Profile.${req.user.id}-${Date.now()}-${file.originalname}`
      userService.update(req.user.id, { $push: { documents: { name: nameDoc, reference: `Profile-${req.user.id}` } } })
      cb(null, nameDoc)
    } else if (file.fieldname === 'product') {
      const nameDoc = `Product.${req.user.id}-${Date.now()}-${file.originalname}`
      userService.update(req.user.id, { $push: { documents: { name: nameDoc, reference: `Product-${req.user.id}` } } })
      cb(null, nameDoc)
    } else if (file.fieldname === 'document') {
      console.log('🚀 ~ file: multer.js:30 ~ file.originalname:', file.originalname)
      if (file.originalname === 'Identificacion.jpg') {
        const nameDoc = `Document.${req.user.id}-${Date.now()}-${file.originalname}`
        userService.update(req.user.id, { $push: { documents: { name: nameDoc, reference: `Document-Identificacion-${req.user.id}` } } })
        cb(null, nameDoc)
      } else if (file.originalname === 'ComprobanteDomicilio.jpg') {
        const nameDoc = `Document.${req.user.id}-${Date.now()}-${file.originalname}`
        userService.update(req.user.id, { $push: { documents: { name: nameDoc, reference: `Document-ComprobanteDomicilio-${req.user.id}` } } })
        cb(null, nameDoc)
      } else if (file.originalname === 'ComprobanteCuenta.jpg') {
        const nameDoc = `Document.${req.user.id}-${Date.now()}-${file.originalname}`
        userService.update(req.user.id, { $push: { documents: { name: nameDoc, reference: `Document-ComprobanteCuenta-${req.user.id}` } } })
        cb(null, nameDoc)
      } else {
        const nameDoc = `Document.${req.user.id}-${Date.now()}-${file.originalname}`
        userService.update(req.user.id, { $push: { documents: { name: nameDoc, reference: `Document-${req.user.id}` } } })
        cb(null, nameDoc)
      }
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
