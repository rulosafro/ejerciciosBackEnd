const express = require("express")
const ProductManager = require("./ProductManager3")

const PORT = 8080
const app = express()
const product = new ProductManager()
//! ver si rutear

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get("/", (req, res) => {
  res.status(200).send("<h1> Hola Coders </h1>")
})

app.get("/products", async (req, res) => {
  try {
    const { limit } = req.query
    const products = await product.getProducts()
    if (!limit) {
      return res.send({
        status: "success",
        data: products,
      })
    } else {
      return res.send({
        status: "success",
        data: products.slice(0, limit),
      })
    }
    // const products = await product.getProducts(limit)
  } catch (error) {}
  console.log(error)
})

app.get("/products/:pid", async (req, res) => {
  try {
    const { pid } = req.params

    const productPID = await product.getProductById(pid)
    if (!productPID) {
      return res.status(404).send("Producto no encontrado")
    } else {
      res.send({
        status: "success",
        data: productPID,
      })
    }
  } catch (error) {
    res.status(500).send("error")
  }
})

//----------------------------------------------------------------

app.listen(PORT, () => {
  console.log(`Escuchando el puerto ${PORT}`)
})
