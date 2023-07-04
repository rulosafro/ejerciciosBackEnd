class ProductRepository {
  constructor(dao) {
    this.dao = dao;
  }

  getProducts = () => {
    return this.dao.get()
  }
  
  getProductById = (pid) => { 
    return this.dao.getByIdProduct(pid)
  }

  createProducts = () => {
    return this.dao.createProducts()
  }

  updateProducts = (pid) => {
    return this.dao.updateProducts(pid)
  }
}

module.exports = ProductRepository