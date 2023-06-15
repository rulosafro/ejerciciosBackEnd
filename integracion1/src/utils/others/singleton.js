const moongoose = require("mongoose")

class MongoSingleton {
  static #instance
  constructor() {
    moongoose.connect(process.env.MONGO_URL, {
      useNewUrlParse: true,
      useUnifiedTopology: true,
    })
  }
  static getInstances() {
    if (this.#instance) {
      console.log("Base de datos ya está creada")
      return this.#instance
    }
    this.#instance = new MongoSingleton()
    console.log("Base de dato creada")
    return this.#instance
  }
}

module.exports = MongoSingleton
