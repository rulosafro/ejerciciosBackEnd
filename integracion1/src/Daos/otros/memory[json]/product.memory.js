class ProductDaoFile {
  constructor() {
    this.products = []
  }
  get() {
    return this.products
  }
  async getById(id) {
    return this.products.find((product) => product.id === id)
  }
}

module.exports = ProductDaoFile
