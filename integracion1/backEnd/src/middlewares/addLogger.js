const { logger } = require('../config/logger')

exports.addLogger = (req, res, next) => {
  req.logger = logger
  logger.info(`${req.method} en ${req.url} - ${new Date().toLocaleDateString()}`)
  next()
}
