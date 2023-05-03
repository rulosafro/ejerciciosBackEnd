const { Router } = require("express")
const { ProductManager } = require("../managerDaos/ProductManager3")

const router = Router()
const productManager = new ProductManager()

//// Agregar limite desafío pasado
router.get("/", async (req, res) => {
  try {
    const { limit } = req.query
    const products = await productManager.getProducts()
    if (!limit) {
      return res.status(200).send({
        status: "success",
        data: products,
      })
    } else {
      return res.status(200).send({
        status: "success",
        data: products.slice(0, limit),
      })
    }
  } catch (error) {
    console.log(error)
  }
})

//// Producto por ID
router.get("/:pid", async (req, res) => {
  try {
    const { pid } = req.params
    const products = await productManager.getProducts()
    // console.log(products)
    const producto = products.find((prod) => prod.id === parseInt(pid))
    if (!producto) return res.send({ error: "No se encuentra el producto" })
    res.status(200).send({ producto })
  } catch (error) {
    console.log(error)
  }
})

// Agregar producto con todos los campos {id, title, description, code, price, status, stock, category, thumbnail(opcional)}
router.post("/", async (req, res) => {
  try {
    //validación dentro del método
    const product = req.body
    const productAgregado = await productManager.addProduct(product)
    const products = await productManager.getProducts()

    res.status(200).send({ products })
  } catch (error) {
    console.log(error)
  }
})

//// Modificar pero que mantega el id
router.put("/:pid", async (req, res) => {
  try {
    const { pid } = req.params
    const productMod = req.body

    //! Validar si todos los campos son necesarios
    const productModificado = await productManager.updateProduct(parseInt(pid), productMod)

    const products = await productManager.getProducts()
    res.status(200).send({ productMod })
  } catch (error) {
    console.error(error)
  }
})

//// Terminar
router.delete("/:pid", async (req, res) => {
  try {
    const { pid } = req.params
    const productEliminado = await productManager.deleteProduct(parseInt(pid))

    const products = await productManager.getProducts()
    res.status(200).send({ productEliminado })
  } catch (error) {
    console.error(error)
  }
})

module.exports = router
