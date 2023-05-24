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
      return await cartsModel
        .findById({ _id: cid })
        .populate("products.product")
        .lean()
    } catch (error) {
      console.error(error)
    }
  }

  async createCart() {
    try {
      return await cartsModel.create({
        products: [],
        userId: null,
        email: null,
      })
    } catch (error) {
      return console.error(error)
    }
  }

  async addToCart(cid, pid, quantity) {
    try {
      // const validacion1 = await cartsModel.findOne({ _id: cid})
      if (await cartsModel.findOne({ _id: cid })) {
        // const validacion2 = await cartsModel.findOne({ _id: cid, "products.product": pid })
        if (await cartsModel.findOne({ _id: cid, "products.product": pid })) {
          const cart = await cartsModel.findOneAndUpdate(
            { _id: cid, "products.product": pid },
            { $inc: { "products.$.quantity": quantity } },
            { new: true }
          )
        } else {
          const cartNew = await cartsModel.findOneAndUpdate(
            { _id: cid },
            { $push: { products: { product: pid, quantity } } },
            { new: true, upsert: true }
          )
        }
      } else {
        return "Operación fallida"
      }
    } catch (error) {
      return console.error(error)
    }
  }

  async deleteCart(cid) {
    try {
      return cartsModel.findOneAndUpdate(
        { _id: cid },
        { $set: { products: [] } },
        { new: true }
      )
    } catch (error) {
      console.log(error)
    }
  }

  async deleteCartProduct(cid, pid) {
    try {
      return cartsModel.findOneAndUpdate(
        { _id: cid },
        { $pull: { products: { product: { _id: pid } } } },
        { new: true }
      )
    } catch (error) {
      console.log(error)
    }
  }

  async updateCart(cid, cambio) {
    try {
      return await cartsModel.updateOne({ _id: cid }, cambio)
    } catch (error) {
      console.log(error)
    }
  }
}

module.exports = new CartsManagerMongo()
