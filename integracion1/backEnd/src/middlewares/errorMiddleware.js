const { EError } = require('../utils/CustomError/Erros')

exports.errorHandler = (error, req, res, next) => {
  // console.log('------')
  // console.log(error)
  // console.log(error.cause)
  switch (error.code) {
    case EError.INVALID_TYPE_ERROR:
      return res.send({ status: 'type error', error: error.name })
      break

    case EError.ROUTING_ERROR:
      return res.send({ status: 'rounting error', error: error.name })
      break

    default:
      return res.send({ status: 'error', error: 'Unhandled error' })
      break
  }
}
