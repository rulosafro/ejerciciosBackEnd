const { productModel } = require("./models/product.model")

class ProductManagerMongo {
  // constructor(model) {
  //   this.productModel = model
  // }

  async getProducts() {
    try {
      return await productModel.find({})
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
      // console.log("Prueba 11")
    }
  }

  async upadteProduct(pid) {}

  async deleteProduct(pid) {}
}

module.exports = new ProductManagerMongo()
