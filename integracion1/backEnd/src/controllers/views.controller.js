const { cartsModel } = require('../Daos/mongo/models/carts.model')
const { productModel } = require('../Daos/mongo/models/product.model')
const { userModel } = require('../Daos/mongo/models/user.model')
const { logger } = require('../config/logger')
const { cartService } = require('../service/index.service')
const { userService } = require('./users.controller')

class ViewsController {
  viewsUsers = async (req, res, next) => {
    try {
      const { page = 1 } = req.query
      const users2 = await userModel.paginate({}, { limit: 10, page, lean: true })
      const { docs, hasPrevPage, hasNextPage, prevPage, nextPage } = users2
      res.status(200).render('users', {
        status: 'success',
        data: docs,
        hasPrevPage,
        hasNextPage,
        prevPage,
        nextPage
      })
    } catch (error) {
      next(error)
    }
  }

  changeRoles = async (req, res, next) => {
    try {
      const users = await userService.get()
      res.status(200).render('changeRoles', {
        status: 'success',
        users
      })
    } catch (error) {
      next(error)
    }
  }

  viewsProducts = async (req, res, next) => {
    try {
      let { pages = 1, limit = 10, sort = 1, query } = req.query

      if (!query) {
        query = {}
      } else {
        query = { title: `Producto ${query}` }
      }

      const products2 = await productModel.paginate(query, {
        limit,
        page: pages,
        sort: {
          price: sort
        },
        lean: true
      })
      const { docs, hasPrevPage, hasNextPage, prevPage, nextPage, totalPages, page } = products2

      const prevLink = hasPrevPage ? `http://localhost:8080/views/products?page=${prevPage}&limit=${limit}&query=${query}&sort=${sort}` : null
      const nextLink = hasNextPage ? `http://localhost:8080/views/products?page=${nextPage}&limit=${limit}&query=${query}&sort=${sort}` : null

      logger.info(req.user)
      const dataUser = req.user

      res.status(200).render('products', {
        status: 'success',
        payload: docs,
        totalPages,
        page,
        prevPage,
        nextPage,
        hasPrevPage,
        hasNextPage,
        prevLink,
        nextLink,
        dataUser
      })
    } catch (error) {
      logger.info({ status: 'error', error })
    }
  }

  viewsRealTime = (req, res, next) => {
    res.render('realTimeProducts', {})
  }

  viewsCarts = async (req, res, next) => {
    try {
      const carts = await cartService.get()
      res.status(200).render('carts', { carts })
    } catch (error) {
      next(error)
    }
  }

  viewsMyCart = async (req, res, next) => {
    try {
      const cid = req.user.cart
      const carrito = await cartService.getByID(cid)
      if (!carrito) res.status(404).send('ID no identificado')
      res.status(200).render('cartsById', { carrito, cid })
    } catch (error) {
      next(error)
    }
  }

  viewsRegister = (req, res, next) => {
    res.status(200).render('registerForm', {})
  }

  viewsLogin = (req, res, next) => {
    res.status(200).render('login', {})
  }

  viewsLogout = async (req, res, next) => {
    try {
      res.clearCookie('coderCookieToken').clearCookie('connect.sid').redirect('/views/products')
    } catch (error) {
      next(error)
    }
  }

  viewsUpload = (req, res, next) => {
    try {
      res.send({
        status: 'success',
        mensaje: 'Archivo subido'
      })
    } catch (error) {
      next(error)
    }
  }

  formData = async (req, res, next) => {
    try {
      const dataUser = req.user
      res.render('formData', { dataUser })
    } catch (error) {
      next(error)
    }
  }
}

module.exports = new ViewsController()
