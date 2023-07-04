const { cartService, productService, ticketService } = require("../service/index.service")

class CartController {
  getCarts = async (req, res) => {
    try {
      const carts = await cartService.get()
      res.status(200).send({
        status: "success",
        payload: carts,
      })
    } catch (error) {
      console.log(error)
    }
  }

  getCartsById = async (req, res) => {
    try {
      const { cid } = req.params
      if (!cid) {
        res.status(404).send("ID no identificado")
      }
      let cart = await cartService.getByID(cid)
      res.status(200).send({
        status: "success",
        payload: cart,
      })
    } catch (error) {
      console.log(error)
    }
  }

  createCarts = async (req, res) => {
    try {
      let result = await cartService.create()
      res.status(200).send({
        status: "success",
        payload: result,
      })
    } catch (error) {
      console.log(error)
    }
  }

  updateCarts = async (req, res) => {
    try {
      const { cid } = req.params
      const cambio = req.body
      const modificado = await cartService.update(cid, cambio)
      res.status(200).send({
        status: "success",
        payload: modificado,
      })
    } catch (error) {
      console.log(error)
    }
  }

  putProductOnCarts = async (req, res) => {
    try {
      const { cid, pid } = req.params
      const { quantity } = req.body
      const product = {
        id: pid,
        quantity: quantity,
      }

      const agregado = await cartService.add(cid, pid, quantity)
      const resultado = await cartService.getByID(cid)

      res.status(200).send({
        status: "success",
        payload: resultado,
      })
    } catch (error) {
      console.log(error)
    }
  }

  deleteCart = async (req, res) => {
    try {
      const { cid } = req.params
      const quitar = await cartService.delete(cid)
      res.status(200).send({
        status: "success",
        payload: quitar,
      })
    } catch (error) {
      console.log(error)
    }
  }

  deleteProductOnCart = async (req, res) => {
    try {
      const { cid, pid } = req.params
      const quitar = await cartService.delete(cid, pid)
      res.status(200).send({
        status: "success",
        payload: quitar,
      })
    } catch (error) {
      console.log(error)
    }
  }
}

module.exports = new CartController()
