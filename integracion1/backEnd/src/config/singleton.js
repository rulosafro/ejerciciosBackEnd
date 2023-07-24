const moongoose = require('mongoose')
const { logger } = require('./logger')

class MongoSingleton {
  static #instance

  constructor () {
    moongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
  }

  static getInstances () {
    if (this.#instance) {
      console.log('Base de datos ya está creada')
      return this.#instance
    }
    this.#instance = new MongoSingleton()
    console.log('Base de datos ingresada')
    return this.#instance
  }
}

module.exports = MongoSingleton
