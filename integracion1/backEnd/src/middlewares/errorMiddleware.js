const { EError } = require('../utils/CustomError/Erros')

exports.errorHandler = (error, req, res, next) => {
  console.log('------')
  // console.log(error)
  switch (error.code) {
    case EError.INVALID_TYPE_ERROR:
      console.log(error.cause)
      return res.send({ status: 'type error', error: error.name })
      break

      // case EError.ROUTING_ERROR:
      //   return res.send({ status: 'rounting error', error: error.name })
      //   break

    default:
      console.log(error.cause)
      return res.send({ status: 'error', error: 'Unhandled error' })
      break
  }
}
