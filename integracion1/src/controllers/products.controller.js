const { productModel } = require("../Daos/mongo/models/product.model")
const { productService } = require("../service/index.service")

class ProductController {
  getProducts = async (req, res) => {
    try {
      const productos = await productService.getProducts()

      let { pages = 1, limit = 10, sort = 1, query } = req.query

      if (!query) {
        query = {}
      } else {
        query = { title: `Producto ${query}` }
      }

      const products2 = await productModel.paginate(query, {
        limit: limit,
        page: pages,
        sort: {
          price: sort,
        },
        lean: true,
      })

      const { docs, hasPrevPage, hasNextPage, prevPage, nextPage, totalPages, page } = products2

      const prevLink = hasPrevPage ? `http://localhost:8080/views/products?page=${prevPage}&limit=${limit}&query=${query}&sort=${sort}` : null
      const nextLink = hasNextPage ? `http://localhost:8080/views/products?page=${nextPage}&limit=${limit}&query=${query}&sort=${sort}` : null

      res.status(200).send({
        status: "success",
        payload: docs,
        totalPages,
        page,
        prevPage,
        nextPage,
        hasPrevPage,
        hasNextPage,
        prevLink,
        nextLink,
      })
    } catch (error) {
      console.log(error)
    }
  }

  getProductsById = async (req, res) => {
    try {
      const { pid } = req.params
      let product = await productService.getProductsByID(pid)
      res.status(200).send({
        status: "success",
        payload: product,
      })
    } catch (error) {
      console.log(error)
    }
  }

  createProducts = async (req, res) => {
    try {
      const newProduct = req.body
      //! Validaciones
      let result = await productService.addProduct(newProduct)
      res.status(200).send({
        status: "success",
        payload: result,
      })
    } catch (error) {
      console.log(error)
    }
  }

  updateProducts = async (req, res) => {
    try {
      const { pid } = req.params
      const cambio = req.body
      const modificado = await productService.updateProduct(pid, cambio)
      res.status(200).send({
        status: "success",
        payload: modificado,
      })
    } catch (error) {
      console.log(error)
    }
  }

  deleteProducts = async (req, res) => {
    try {
      const { pid } = req.params
      const quitar = await productService.deleteProduct(pid)
      res.status(200).send({
        status: "success",
        payload: quitar,
      })
    } catch (error) {
      console.log(error)
    }
  }
}

module.exports = new ProductController()
