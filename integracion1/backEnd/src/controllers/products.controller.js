const { productModel } = require('../Daos/mongo/models/product.model')
const { productService } = require('../service/index.service')
const { CustomError } = require('../utils/CustomError/CustomError')
const { EError } = require('../utils/CustomError/Erros')
const { generateProductErrorInfo } = require('../utils/CustomError/info')

class ProductController {
  getProducts = async (req, res, next) => {
    try {
      const productos = await productService.get()

      let { pages = 1, limit = 10, sort = 1, query } = req.query
      if (!query) {
        query = {}
      } else {
        query = { title: `Producto ${query}` }
      }

      const products2 = await productModel.paginate(query, {
        limit,
        page: pages,
        sort: { price: sort },
        lean: true
      })

      const { docs, hasPrevPage, hasNextPage, prevPage, nextPage, totalPages, page } = products2
      const prevLink = hasPrevPage ? `http://localhost:8080/views/products?page=${prevPage}&limit=${limit}&query=${query}&sort=${sort}` : null
      const nextLink = hasNextPage ? `http://localhost:8080/views/products?page=${nextPage}&limit=${limit}&query=${query}&sort=${sort}` : null

      res.status(200).send({ status: 'success', payload: docs, totalPages, page, prevPage, nextPage, hasPrevPage, hasNextPage, prevLink, nextLink })
    } catch (error) {
      next(error)
    }
  }

  getProductsById = async (req, res, next) => {
    try {
      const { pid } = req.params
      const product = await productService.getByID(pid)

      if (!product) {
        CustomError.createError({
          name: 'Product finder fail',
          cause: generateProductErrorInfo(
            product
          ),
          message: 'Error trying find a product by ID: ' + pid,
          code: EError.ROUTING_ERROR
        })
      }

      res.status(200).send({
        status: 'success',
        payload: product
      })
    } catch (error) {
      next(error)
    }
  }

  createProducts = async (req, res, next) => {
    try {
      const newProduct = req.body

      if (!newProduct) {
        CustomError.createError({
          name: 'Product create fail',
          cause: generateProductErrorInfo(
            newProduct
          ),
          message: 'Error trying create a product',
          code: EError.ROUTING_ERROR
        })
      }

      const result = await productService.add(newProduct)
      res.status(200).send({
        status: 'success',
        payload: result
      })
    } catch (error) {
      next(error)
    }
  }

  updateProducts = async (req, res, next) => {
    try {
      const { pid } = req.params
      const cambio = req.body

      if (!pid) {
        CustomError.createError({
          name: 'Product finder fail',
          cause: generateProductErrorInfo(
            pid
          ),
          message: 'Error trying find a product without ID ',
          code: EError.ROUTING_ERROR
        })
      }

      if (!cambio) {
        CustomError.createError({
          name: 'Product create fail',
          cause: generateProductErrorInfo(
            cambio
          ),
          message: 'Error trying create a product',
          code: EError.ROUTING_ERROR
        })
      }

      const modificado = await productService.update(pid, cambio)
      res.status(200).send({
        status: 'success',
        payload: modificado
      })
    } catch (error) {
      next(error)
    }
  }

  deleteProducts = async (req, res, next) => {
    try {
      const { pid } = req.params

      if (!pid) {
        CustomError.createError({
          name: 'Product finder fail',
          cause: generateProductErrorInfo(
            pid
          ),
          message: 'Error trying find a product by ID: ' + pid,
          code: EError.ROUTING_ERROR
        })
      }

      const quitar = await productService.delete(pid)
      res.status(200).send({
        status: 'success',
        payload: quitar
      })
    } catch (error) {
      next(error)
    }
  }
}

module.exports = new ProductController()
