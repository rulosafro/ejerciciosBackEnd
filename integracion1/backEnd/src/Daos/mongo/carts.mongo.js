const { cartsModel } = require("./models/carts.model")

class CartsManagerMongo {
  async get() {
    try {
      return await cartsModel.find({}).lean()
    } catch (error) {
      return new Error(error)
    }
  }

  async getByID(cid) {
    try {
      return await cartsModel.findById({ _id: cid }).populate("products.product").lean()
    } catch (error) {
      console.error(error)
    }
  }

  async create() {
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

  async add(cid, pid, quantity) {
    try {
      if (await cartsModel.findOne({ _id: cid })) {
        if (await cartsModel.findOne({ _id: cid, "products.product": pid })) {
          await cartsModel.findOneAndUpdate({ _id: cid, "products.product": pid }, { $inc: { "products.$.quantity": quantity } }, { new: true })
        } else {
          await cartsModel.findOneAndUpdate({ _id: cid }, { $push: { products: { product: pid, quantity } } }, { new: true, upsert: true })
        }
      } else {
        return "Operación fallida"
      }
    } catch (error) {
      return console.error(error)
    }
  }

  async update(cid, cambio) {
    try {
      return await cartsModel.updateOne({ _id: cid }, cambio)
    } catch (error) {
      console.log(error)
    }
  }

  async delete(cid) {
    try {
      return cartsModel.findOneAndUpdate({ _id: cid }, { $set: { products: [] } }, { new: true })
    } catch (error) {
      console.log(error)
    }
  }

  async deleteProduct(cid, pid) {
    try {
      return cartsModel.findOneAndUpdate({ _id: cid }, { $pull: { products: { product: { _id: pid } } } }, { new: true })
    } catch (error) {
      console.log(error)
    }
  }
}

module.exports = CartsManagerMongo
