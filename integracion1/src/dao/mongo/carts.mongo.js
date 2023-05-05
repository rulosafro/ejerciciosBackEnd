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

  async addCart() {
    try {
      return await cartsModel.create({ products: [] })
    } catch (error) {
      return console.error(error)
    }
  }

  async updateCart(cid, cambio) {
    try {
      return await cartsModel.updateOne({ _id: cid }, cambio)
    } catch (error) {
      console.log(error)
    }
  }

  async deleteCart(cid) {
    try {
      return cartsModel.deleteOne({ _id: cid })
    } catch (error) {
      console.log(error)
    }
  }
}

module.exports = new CartsManagerMongo()
