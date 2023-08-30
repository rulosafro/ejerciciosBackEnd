const { productModel } = require('../Daos/mongo/models/product.model')
const { productService } = require('../service/index.service')
const { CustomError } = require('../utils/CustomError/CustomError')
const { EError } = require('../utils/CustomError/Erros')
const { generateProductErrorInfo } = require('../utils/CustomError/info')
const { sendMail } = require('../utils/sendmail')
const { userService } = require('./users.controller')

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

      if (!newProduct.owner) {
        newProduct.owner = req.user.email
      }

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
      await console.log(req.body)
      const dataUser = await userService.getByMail(req.body.email)
      const dataProduct = await productService.getByID(pid)
      const dataOwner = await userService.getByMail(dataProduct.owner)

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

      if (dataUser.role === 'premium' && dataProduct.owner !== dataUser.email) {
        res.status(400).send('El usuario premium sólo puede eliminarr productos de su pertenencia')
      }
      if (dataOwner.role === 'premium') {
        sendMail(dataOwner.email, 'Tu producto ha sido elimiando', `<h1>Un administrador ha eliminado un producto tuyo</h1> <blockquote>El producto de id: ${pid} title:${dataProduct.title} </blockquote> <p> Recuerda que siempre puedes subir productos a nuestro catálogo</p>`)
        const quitar = await productService.delete(pid)
        res.status(200).send({ status: 'success', message: 'Se ha eliminado de forma exitosa el producto', quitar })
      }
      if (dataUser.role === 'user') {
        res.status(400).send('No tienes permiso para eliminar un producto del catálogo')
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
