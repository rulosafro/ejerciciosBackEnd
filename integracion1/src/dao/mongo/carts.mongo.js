const { cartsModel } = require("./models/carts.model")

class CartsManagerMongo {
  async getCarts() {
    try {
      return await cartsModel.find({})
    } catch (error) {
      return new Error(error)
    }
  }

  async getCartsByID(cid) {
    try {
      return await cartsModel.findOne({ _id: cid })
    } catch (error) {
      console.error(error)
    }
  }

  async addCart(newCarts) {
    try {
      return await cartsModel.create(newCarts)
    } catch (error) {
      return console.error(error + "El error esta acá")
      // console.log("Prueba 11")
    }
  }

  async upadteCart(cid) {}

  async deleteCart(cid) {}
}

module.exports = new CartsManagerMongo()
