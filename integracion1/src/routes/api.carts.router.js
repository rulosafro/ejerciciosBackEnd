const { Router } = require("express")
const cartsManager = require("../dao/mongo/carts.mongo")
const cartsMongo = require("../dao/mongo/carts.mongo")

const router = Router()

router.get("/", async (req, res) => {
  try {
    const carts = await cartsManager.getCarts()
    res.status(200).send({
      status: "success",
      payload: carts,
    })
  } catch (error) {
    console.log(error)
  }
})

router.get("/:cid", async (req, res) => {
  try {
    const { cid } = req.params
    if (!cid) {
      res.status(404).send("ID no identificado")
    }
    let cart = await cartsManager.getCartsByID(cid)
    res.status(200).send({
      status: "success",
      payload: cart,
    })
  } catch (error) {
    console.log(error)
  }
})

router.post("/", async (req, res) => {
  try {
    let result = await cartsManager.createCart()
    res.status(200).send({
      status: "success",
      payload: result,
    })
  } catch (error) {
    console.log(error)
  }
})

router.post("/:cid/product/:pid", async (req, res) => {
  try {
    const { cid, pid } = req.params
    const { quantity } = req.body
    const product = {
      id: pid,
      quantity: quantity,
    }

    const agregado = await cartsManager.addToCart(cid, pid, quantity)
    const resultado = await cartsManager.getCartsByID(cid)

    res.status(200).send({
      status: "success",
      payload: resultado,
    })
  } catch (error) {
    console.log(error)
  }
})

router.delete("/:cid", async (req, res) => {
  try {
    const { cid } = req.params
    const quitar = await cartsManager.deleteCart(cid)
    res.status(200).send({
      status: "success",
      payload: quitar,
    })
  } catch (error) {
    console.log(error)
  }
})

router.delete("/:cid/product/pid", async (req, res) => {
  try {
    const { cid, pid } = req.params
    const quitar = await cartsManager.deleteCartProduct(cid, pid)
    res.status(200).send({
      status: "success",
      payload: quitar,
    })
  } catch (error) {
    console.log(error)
  }
})

router.put("/:cid", async (req, res) => {
  try {
    const { cid } = req.params
    const cambio = req.body
    const modificado = await cartsManager.updateCart(cid, cambio)
    res.status(200).send({
      status: "success",
      payload: modificado,
    })
  } catch (error) {
    console.log(error)
  }
})

module.exports = router
