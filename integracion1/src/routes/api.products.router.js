const { Router } = require("express")
const productManager = require("../dao/mongo/product.mongo.js")
const { Handlebars } = require("express-handlebars")

const router = Router()

router.get("/", async (req, res) => {
  try {
    const productos = await productManager.getProducts()
    res.status(200).send({
      status: "success",
      payload: productos,
    })
  } catch (error) {
    console.log(error)
  }
})

router.get("/:pid", async (req, res) => {
  try {
    const { pid } = req.params
    let product = await productManager.getProductsByID(pid)
    res.status(200).send({
      status: "success",
      payload: product,
    })
  } catch (error) {
    console.log(error)
  }
})

router.post("/", async (req, res) => {
  try {
    const newProduct = req.body
    //! Validaciones
    let result = await productManager.addProduct(newProduct)
    res.status(200).send({
      status: "success",
      payload: result,
    })
  } catch (error) {
    console.log(error)
  }
})

router.put("/:pid", async (req, res) => {
  try {
    const { pid } = req.params
    const cambio = req.body
    const modificado = await productManager.updateProduct(pid, cambio)
    res.status(200).send({
      status: "success",
      payload: modificado,
    })
  } catch (error) {
    console.log(error)
  }
})

router.delete("/:pid", async (req, res) => {
  try {
    const { pid } = req.params
    const quitar = await productManager.deleteProduct(pid)
    res.status(200).send({
      status: "success",
      payload: quitar,
    })
  } catch (error) {
    console.log(error)
  }
})

module.exports = router
