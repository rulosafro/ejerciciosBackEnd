const { Router } = require("express")
const cartManager = require("../dao/mongo/carts.mongo")

const router = Router()

router.get("/", async (req, res) => {
  try {
    const carts = await cartManager.getCarts()
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
    let cart = await cartManager.getCartsByID(cid)
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
    let result = await cartManager.addCart(newCart)
    res.status(200).send({
      status: "success",
      payload: result,
    })
  } catch (error) {
    console.log(error)
  }
})

router.put("/:cid", async (req, res) => {
  try {
    const { cid } = req.params
    const cambio = req.body
    const modificado = await cartManager.upadteCart(cid, cambio)
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
    const quitar = await cartManager.deleteCart(cid)
    res.status(200).send({
      status: "success",
      payload: quitar,
    })
  } catch (error) {
    console.log(error)
  }
})

module.exports = router