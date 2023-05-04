const { cartsModel } = require("./models/carts.model")

class CartsManagerMongo {
  async getCarts() {
    try {
      return await cartsModel.find({})
    } catch (error) {
      return new Error(error)
    }
  }

  async getCartssByID(cid) {
    try {
      return await cartsModel.findOne({ _id: cid })
    } catch (error) {
      console.error(error)
    }
  }

  async addCarts(newCarts) {
    try {
      return await cartsModel.create(newCarts)
    } catch (error) {
      return console.error(error + "El error esta acá")
      // console.log("Prueba 11")
    }
  }

  async upadteCarts(cid) {}

  async deleteCarts(cid) {}
}

module.exports = new CartsManagerMongo()
