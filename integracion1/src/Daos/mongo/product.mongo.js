const { productModel } = require("./models/product.model")

class ProductManagerMongo {
  constructor() {
    //  iniciar la base de datos
    this.productModel = productModel
  }

  async get() {
    try {
      return await productModel.find({}).lean()
    } catch (error) {
      return new Error(error)
    }
  }

  async getByID(pid) {
    try {
      return await productModel.findOne({ _id: pid })
    } catch (error) {
      console.error(error)
    }
  }

  async add(newProduct) {
    try {
      return await productModel.create(newProduct)
    } catch (error) {
      return console.error(error + "El error esta acá")
    }
  }

  async update(pid, cambio) {
    try {
      return await productModel.updateOne({ _id: pid }, cambio)
    } catch (error) {
      console.log(error)
    }
  }

  async delete(pid) {
    try {
      return productModel.deleteOne({ _id: pid })
    } catch (error) {
      console.log(error)
    }
  }
}

module.exports = ProductManagerMongo
