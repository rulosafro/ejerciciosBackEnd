const { Router } = require("express")
const cartsManager = require("../dao/mongo/carts.mongo")

const router = Router()

router.get("/", async (req, res) => {
  try {
    const carts = await cartsManager.getCarts()
    res.status(200).render("carts", { carts })
  } catch (error) {
    console.log(error)
  }
})

router.get("/:cid", async (req, res) => {
  try {
    const { cid } = req.params
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
    const newCart = req.body
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
    const { cid } = req.params
    const { pid } = req.params
    const agregado = await cartsManager.addToCart(cid, pid)
    const resultado = await cartsManager.getCartsByID(cid)
    res.status(200).send({
      status: "success",
      payload: resultado,
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

module.exports = router
