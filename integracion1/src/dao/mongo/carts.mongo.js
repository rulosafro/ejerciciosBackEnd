const { cartsModel } = require("./models/carts.model")
const { productModel } = require("./models/product.model")
const productManager = require("./product.mongo")

class CartsManagerMongo {
  async getCarts() {
    try {
      return await cartsModel.find({}).lean()
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

  async createCart() {
    try {
      return await cartsModel.create({ products: [] })
    } catch (error) {
      return console.error(error)
    }
  }

  async addToCart(cid, pid) {
    try {
      const cart = await cartsModel.findById({ _id: cid })
      const prod = await productManager.getProductsByID(pid)
      const prodIndex = cart.products.findIndex((prod) => prod.id === pid)

      if (!cart || !prod) {
        return "Operación fallida"
      } else {
        if (prodIndex === -1) {
          cart.products.push({ _id: pid, quantity: 1 })
          return await cartsModel.findOneAndUpdate({ _id: cid }, cart)
        } else {
          return await cartsModel.updateOne({ _id: cid, "products._id": pid }, { $inc: { "products.$.quantity": 1 } })
        }
      }
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
