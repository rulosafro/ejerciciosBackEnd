const { cartsModel } = require("../Daos/mongo/models/carts.model")
const { ticketService, productService, cartService } = require("../service/index.service")
const { createHash, validPassword } = require("../utils/bcryptHash")

class TicketController {
  getTicket = async (req, res) => {
    try {
      const tickets = await ticketService.get()
      res.status(200).send({
        status: "success",
        payload: tickets
      })
    } catch (error) {
      console.log(error)
    }
  }

  getTicketById = async (req, res) => {
    try {
      const { tid } = req.params
      if (!tid) {
        res.status(404).send("ID no identificado")
      }
      let ticket = await ticketService.getById(tid)
      res.status(200).send({
        status: "success",
        payload: ticket,
      })
    } catch (error) {
      console.log(error)
    }
  }

  createTicket = async (req, res) => {
    try {
      let result = await ticketService.create()
      res.status(200).send({
        status: "success",
        payload: result,
      })
    } catch (error) {
      console.log(error)
    }
  }

  updateTicket = async (req, res) => {
    try {
      const { tid } = req.params
      const cambio = req.body
      const modificado = await ticketService.update(tid, cambio)
      res.status(200).send({
        status: "success",
        payload: modificado,
      })
    } catch (error) {
      console.log(error)
    }
  }

  purchaseTicket = async (req, res) => {
    const { tid } = req.params
    const cart = await cartService.getByID(tid)
    if (!cart) return res.send({ error: "error", status: "No se ha encontrado un carro con este ID" })
    
    const productNoComprado = []
    const productComprado = []
    let total = 0

    cart.products.forEach(prod => {
      let newStock = prod.product.stock - prod.quantity
      if (prod.quantity > prod.product.stock) {
        productNoComprado.push(prod.product)
      }
      else {
        productService.update(prod.product, { stock: newStock })
        productComprado.push(prod.product)
      }
    })
    
    productComprado.forEach(item => cartService.deleteProduct(tid, item._id))
    const filtro = cart.products.filter(prod => !productNoComprado.includes(prod.product))
    filtro.forEach(prod => {total += parseInt(prod.quantity) });
    
    const ticket = {
      code: createHash(tid),
      amount: parseInt(total),
      purchaser: 'b@b.com',
      // purchaser: req.user.mail,
    }

    const tickets = await ticketService.get({})
    const check = tickets.some(tick => tick === ticket.code)
    if (!check) {
      let resultado = ticketService.create(ticket)
      res.send({
        status: 'success',
        payload: {ticket, productComprado},
        noStock: productNoComprado
      })  
    } else {
      res.send({
        status: 'error',
        error: 'Este código ya existe',
      })
    }

  }
}

module.exports = new TicketController()