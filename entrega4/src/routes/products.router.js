const { Router } = require("express")
const { ProductManager } = require("../managerDaos/ProductManager3")

const router = Router()
const productManager = new ProductManager()

router.get("/", async (req, res) => {
  const products = await productManager.getProducts()
  res.send({})
})

module.exports = router
