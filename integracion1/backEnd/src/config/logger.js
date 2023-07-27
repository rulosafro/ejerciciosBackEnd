const config = require('./objectConfig')
const winston = require('winston')
const { persistence } = require('../config/objectConfig')

const customLevelOptions = {
  levels: { fatal: 0, error: 1, warning: 2, info: 3, http: 4, debug: 5 },
  colors: { fatal: 'red', error: 'yellow', warning: 'blue', info: 'green', http: 'cyan', debug: 'white' }
}

let logger
switch (persistence) {
  case 'MONGO':
    logger = winston.createLogger({
      levels: customLevelOptions.levels,
      transports: [
        new winston.transports.Console({
          level: 'info',
          format: winston.format.combine(
            winston.format.colorize({ colors: customLevelOptions.colors }),
            winston.format.simple()
          )
        })
        // new winston.transports.File({ filename: '../.errors.log', level: 'error', format: winston.format.simple() })
      ]
    })
    break

  case 'FILE':
    logger = winston.createLogger({
      levels: customLevelOptions.levels,
      transports: [
        new winston.transports.Console({
          level: 'debug',
          format: winston.format.combine(
            winston.format.colorize({ colors: customLevelOptions.colors }),
            winston.format.simple()
          )
        }),
        new winston.transports.File({ filename: '../.errors.log', level: 'error', format: winston.format.simple() })
      ]
    })
    break

  default:
    logger = winston.createLogger({
      levels: customLevelOptions.levels,
      transports: [
        new winston.transports.Console({
          level: 'http',
          format: winston.format.combine(
            winston.format.colorize({ colors: customLevelOptions.colors }),
            winston.format.simple())
        }),
        new winston.transports.File({ filename: '../.errors.log', level: 'warn' })
      ]
    })
    break
}

const addLogger = (req, res, next) => {
  req.logger = logger
  req.logger.info(`${req.method} en ${req.url} - ${new Date().toLocaleDateString()}`)
  next()
}

module.exports = {
  logger,
  addLogger
}
