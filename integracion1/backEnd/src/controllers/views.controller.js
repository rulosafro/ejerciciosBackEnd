const { cartsModel } = require('../Daos/mongo/models/carts.model')
const { productModel } = require('../Daos/mongo/models/product.model')
const { userModel } = require('../Daos/mongo/models/user.model')
const { logger } = require('../config/logger')
const { cartService, productService, ticketService } = require('../service/index.service')
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
      const dataUser = req.user
      const carrito = await cartService.getByID(req.user.cart)
      const itemsInCart = carrito.products.reduce((acc, item) => { return acc + item.quantity }, 0)

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
        dataUser,
        carrito,
        itemsInCart
      })
    } catch (error) {
      logger.info({ status: 'error', error })
    }
  }

  viewsProductDetail = async (req, res, next) => {
    try {
      const { pid } = req.params
      const dataItem = await productService.getByID(pid)
      const carrito = await cartService.getByID(req.user.cart)
      const itemsInCart = await carrito.products.reduce((acc, item) => { return acc + item.quantity }, 0)

      res.status(200).render('productDetail', { status: 'success', dataItem, itemsInCart })
    } catch (error) {
      logger.info(error)
    }
  }

  viewsProductCreate = async (req, res, next) => {
    try {
      if (req.user.role === 'admin') {
        res.status(404).render('home', { message: 'Estas es una funcionalidad para usuarios Premium, accede de otra cuenta que no sea admin', style: 'text-warning' })
      } else if (req.user.role !== 'premium') {
        res.status(404).render('home', { message: 'Para crear productos debes ser premium, haz el upgrade a tu cuenta', style: 'text-danger' })
      } else {
        res.status(200).render('formProduct', { status: 'success' })
      }
    } catch (error) {
      logger.info(error)
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

  viewMyCart = async (req, res, next) => {
    try {
      const cid = req.user.cart
      const carrito = await cartService.getByID(cid)
      const itemsInCart = carrito.products.reduce((acc, item) => { return acc + item.quantity }, 0)
      const dataUser = req.user
      const totalPrice = carrito.products.reduce((acc, item) => { return acc + (item.quantity * item.product.price) }, 0)

      if (!carrito) res.status(404).send('ID no identificado')
      res.status(200).render('cartsById', { carrito, cid, dataUser, itemsInCart, totalPrice })
    } catch (error) {
      next(error)
    }
  }

  viewCheckout = async (req, res, next) => {
    try {
      const { cid } = req.params
      const carrito = await cartService.getByID(cid)
      const itemsInCart = carrito.products.reduce((acc, item) => { return acc + item.quantity }, 0)
      const dataUser = req.user
      const totalPrice = carrito.products.reduce((acc, item) => { return acc + (item.quantity * item.product.price) }, 0)

      if (!carrito) res.status(404).send('ID no identificado')
      res.status(200).render('checkout', { carrito, cid, dataUser, itemsInCart, totalPrice })
    } catch (error) {
      next(error)
    }
  }

  viewCheckoutTicket = async (req, res, next) => {
    try {
      const { cid } = req.params
      const tickets = await ticketService.getByCid(cid)
      res.status(200).render('checkoutRes', { tickets })
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
