const { productModel } = require("./models/product.model")

class ProductManagerMongo {
  // constructor(model) {
  //   this.productModel = model
  // }

  async getProducts() {
    try {
      return await productModel.find({}).lean()
    } catch (error) {
      return new Error(error)
    }
  }

  async getProductsByID(pid) {
    try {
      return await productModel.findOne({ _id: pid })
    } catch (error) {
      console.error(error)
    }
  }

  async addProduct(newProduct) {
    try {
      return await productModel.create(newProduct)
    } catch (error) {
      return console.error(error + "El error esta acá")
    }
  }

  async updateProduct(pid, cambio) {
    try {
      return await productModel.updateOne({ _id: pid }, cambio)
    } catch (error) {
      console.log(error)
    }
  }

  async deleteProduct(pid) {
    try {
      return productModel.deleteOne({ _id: pid })
    } catch (error) {
      console.log(error)
    }
  }
}

module.exports = new ProductManagerMongo()
