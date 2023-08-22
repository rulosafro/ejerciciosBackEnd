const { request } = require('express')
const { logger } = require('../config/logger')
const { cartService, productService, ticketService } = require('../service/index.service')
const { CustomError } = require('../utils/CustomError/CustomError')
const { EError } = require('../utils/CustomError/Erros')
const { generateCartErrorInfo } = require('../utils/CustomError/info')
const { cartsModel } = require('../Daos/mongo/models/carts.model')

class CartController {
  getCarts = async (req, res, next) => {
    try {
      const carts = await cartService.get()
      res.status(200).send({
        status: 'success',
        payload: carts
      })
    } catch (error) {
      next(error)
    }
  }

  getCartsById = async (req, res, next) => {
    try {
      const { cid } = req.params
      if (!cid) {
        CustomError.createError({
          name: 'Cart finder fail',
          cause: generateCartErrorInfo(
            cid
          ),
          message: 'Error trying find a cart by ID: ' + cid,
          code: EError.ROUTING_ERROR
        })
      }

      // if (!cid) {
      //   res.status(404).send('ID no identificado')
      // }
      const cart = await cartService.getByID(cid)
      res.status(200).send({
        status: 'success',
        payload: cart
      })
    } catch (error) {
      next(error)
    }
  }

  getMyCart = async (req, res, next) => {
    try {
      // if (!cid) {
      //   CustomError.createError({
      //     name: 'Cart finder fail',
      //     cause: generateCartErrorInfo(
      //       cid
      //     ),
      //     message: 'Error trying find a cart by ID: ' + cid,
      //     code: EError.ROUTING_ERROR
      //   })
      // }
      console.log(req.user)
      const cart = await cartsModel.getByID(req.user.id)
      res.status(200).send({
        status: 'success',
        payload: cart
      })
    } catch (error) {
      next(error)
    }
  }

  createCarts = async (req, res, next) => {
    try {
      const result = await cartService.create()
      res.status(200).send({
        status: 'success',
        payload: result
      })
    } catch (error) {
      next(error)
    }
  }

  updateCarts = async (req, res, next) => {
    try {
      const { cid } = req.params
      const cambio = req.body

      if (!cid) {
        CustomError.createError({
          name: 'Cart finder fail',
          cause: generateCartErrorInfo(
            cid
          ),
          message: 'Error trying find a cart by ID: ' + cid,
          code: EError.ROUTING_ERROR
        })
      }

      const modificado = await cartService.update(cid, cambio)
      res.status(200).send({
        status: 'success',
        payload: modificado
      })
    } catch (error) {
      next(error)
    }
  }

  putProductOnCartsQuantity = async (req, res, next) => {
    try {
      const { cid, pid, num } = req.params

      if (!cid) {
        CustomError.createError({
          name: 'Cart finder fail',
          cause: generateCartErrorInfo(
            cid
          ),
          message: 'Error trying find a cart by ID: ' + cid,
          code: EError.ROUTING_ERROR
        })
      }

      // const ifPremium = await req.user.role === 'premium'
      // if (ifPremium) {
      //   const productData = productService.getByID(pid)
      //   productData.owner === req.user.email && res.status(400).send('Un usuario premium no puede agregar productos de su pertenencia al carrito')
      // }

      const quantity = parseInt(num)
      const product = {
        id: pid,
        quantity: parseInt(num)
      }

      const agregado = await cartService.add(cid, pid, quantity)
      const resultado = await cartService.getByID(cid)

      res.status(200).send({
        status: 'success',
        payload: resultado
      })
    } catch (error) {
      next(error)
    }
  }

  putProductOnCarts = async (req, res, next) => {
    try {
      const { cid, pid } = req.params
      const { quantity } = req.body

      if (!cid) {
        CustomError.createError({
          name: 'Cart finder fail',
          cause: generateCartErrorInfo(
            cid
          ),
          message: 'Error trying find a cart by ID: ' + cid,
          code: EError.ROUTING_ERROR
        })
      }

      // if (req.user.role === 'premium') {
      //   const productData = productService.getByID(pid)
      //   productData.owner === req.user.email && res.status(400).send('Un usuario premium no puede agregar productos de su pertenencia al carrito')
      // }

      const product = {
        id: pid,
        quantity: parseInt(quantity)
      }
      const dataProduct = productService.getByID(pid)

      const agregado = await cartService.add(cid, pid, quantity)
      const resultado = await cartService.getByID(cid)

      res.status(200).send({
        status: 'success',
        payload: resultado
      })
    } catch (error) {
      next(error)
    }
  }

  putProductOnMyCart = async (req, res, next) => {
    try {
      const { pid } = req.params
      const { quantity } = req.body

      if (!pid) {
        CustomError.createError({
          name: 'Cart finder fail',
          cause: generateCartErrorInfo(
            pid
          ),
          message: 'Error trying find a cart by ID: ' + pid,
          code: EError.ROUTING_ERROR
        })
      }

      if (req.user.role === 'premium') {
        const productData = productService.getByID(pid)
        productData.owner === req.user.email && res.status(400).send('Un usuario premium no puede agregar productos de su pertenencia al carrito')
      }

      const product = {
        id: pid,
        quantity
      }
      logger.info(req.user.cart)

      const agregado = await cartService.add(req.user.cart, pid, quantity)
      const resultado = await cartService.getByID(req.user.cart)

      res.status(200).send({
        status: 'success',
        payload: resultado
      })
    } catch (error) {
      next(error)
    }
  }

  deleteCart = async (req, res, next) => {
    try {
      const { cid } = req.params

      if (!cid) {
        CustomError.createError({
          name: 'Cart finder fail',
          cause: generateCartErrorInfo(
            cid
          ),
          message: 'Error trying find a cart by ID: ' + cid,
          code: EError.ROUTING_ERROR
        })
      }

      const quitar = await cartService.delete(cid)
      res.status(200).send({
        status: 'success',
        payload: quitar
      })
    } catch (error) {
      next(error)
    }
  }

  deleteProductOnCart = async (req, res, next) => {
    try {
      const { cid, pid } = req.params

      if (!cid) {
        CustomError.createError({
          name: 'Cart finder fail',
          cause: generateCartErrorInfo(
            cid
          ),
          message: 'Error trying find a cart by ID: ' + cid,
          code: EError.ROUTING_ERROR
        })
      }

      const quitar = await cartService.deleteProduct(cid, pid)

      res.status(200).send({
        status: 'success',
        payload: quitar
      })
    } catch (error) {
      console.log(error)
    }
  }
}

module.exports = new CartController()
