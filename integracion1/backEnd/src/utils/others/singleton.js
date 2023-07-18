const moongoose = require('mongoose')
const { logger } = require('../../config/logger')

class MongoSingleton {
  static #instance

  constructor () {
    moongoose.connect(process.env.MONGO_URL, {
      useNewUrlParse: true,
      useUnifiedTopology: true
    })
  }

  static getInstances () {
    if (this.#instance) {
      logger.info('Base de datos ya está creada')
      return this.#instance
    }
    this.#instance = new MongoSingleton()
    logger.info('Base de datos creada')
    return this.#instance
  }
}

module.exports = MongoSingleton
