const { Router } = require("express")
const { ProductManager } = require("../managerDaos/ProductManager3")

const router = Router()
const productManager = new ProductManager()

//! Agregar limite desafío pasado
router.get("/", async (req, res) => {
  const products = await productManager.getProducts()
  res.send({ products })
})

//! Producto por ID
router.get("/:pid", async (req, res) => {})

//! Agregar producto con todos los campos {id, title, description, code, price, status, stock, category, thumbnail(opcional)}
router.post("/", async (req, res) => {})

//! Modificar pero que mantega el id
router.put("/:id", async (req, res) => {})

//! Terminar
router.delete("/:id", async (req, res) => {})

module.exports = router
