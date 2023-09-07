const { ObjectId } = require('mongodb')
const { logger } = require('../config/logger')
const { ticketService, productService, cartService } = require('../service/index.service')
const { createHash, validPassword } = require('../utils/bcryptHash')
const { ticketModel } = require('../Daos/mongo/models/ticket.model')

class TicketController {
  getTicket = async (req, res, next) => {
    try {
      const tickets = await ticketService.get()
      res.status(200).send({
        status: 'success',
        payload: tickets
      })
    } catch (error) {
      next(error)
    }
  }

  getTicketById = async (req, res, next) => {
    try {
      const { tid } = req.params
      if (!tid) res.status(404).send('ID no identificado')
      const ticket = await ticketService.getById(tid)

      res.status(200).send({
        status: 'success',
        payload: ticket
      })
    } catch (error) {
      next(error)
    }
  }

  createTicket = async (req, res, next) => {
    try {
      const { cid } = req.params
      const productos = await cartService.getByID(cid)
      const data = {
        amount: productos.products.reduce((acc, item) => { return acc + (item.quantity * item.product.price) }, 0),
        purchaser: req.user.email,
        productos
      }
      const result = await ticketService.create(data)

      if (result) {
        res.status(200).send({
          status: 'success',
          payload: result
        })
      } else {
        next(error)
      }
    } catch (error) {
      next(error)
    }
  }

  updateTicket = async (req, res, next) => {
    try {
      const { tid } = req.params
      const cambio = req.body
      const modificado = await ticketService.update(tid, cambio)

      res.status(200).send({
        status: 'success',
        payload: modificado
      })
    } catch (error) {
      next(error)
    }
  }

  purchaseTicket = async (req, res, next) => {
    try {
      const { cid } = req.params
      const cart = await cartService.getByID(cid)
      if (!cart) return res.send({ error: 'error', status: 'No se ha encontrado un carro con este ID' })

      const productNoComprado = []
      const productComprado = []
      let total = 0

      cart.products.forEach(prod => {
        const newStock = prod.product.stock - prod.quantity
        if (prod.quantity > prod.product.stock) {
          productNoComprado.push(prod.product)
        } else {
          productService.update(prod.product, { stock: newStock })
          productComprado.push(prod.product)
        }
      })

      productComprado.forEach(item => cartService.deleteProduct(cid, item._id))
      const filtro = cart.products.filter(prod => !productNoComprado.includes(prod.product))
      filtro.forEach(prod => { total += parseInt(prod.quantity) })

      const ticket = {
        code: new ObjectId(),
        amount: parseInt(total),
        cartID: cid,
        purchaser: req.user.email,
        productComprado,
        productNoComprado
      }

      const tickets = await ticketService.get({})
      const check = tickets.some(tick => tick.code === ticket.code)
      const resultado = await ticketModel.create(ticket)
      if (!check) {
        const resultado = await ticketService.create(ticket)
        res.status(200)
          .send({
            status: 'success',
            payload: { ticket, productComprado },
            noStock: productNoComprado
          })
      } else {
        res.send({
          status: 'error',
          error: 'Este código ya existe'
        })
      }
    } catch (error) {
      next(error)
    }
  }
}

module.exports = new TicketController()
