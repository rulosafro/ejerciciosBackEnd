const { Router } = require("express")
const productManager = require("../dao/mongo/product.mongo.js")
const { Handlebars } = require("express-handlebars")
const { productModel } = require("../dao/mongo/models/product.model.js")

const router = Router()

router.get("/", async (req, res) => {
  try {
    // const productos = await productManager.getProducts()

    let { pages = 1, limit = 10, sort = 1, query } = req.query

    if (!query) {
      query = {}
    } else {
      query = { title: `Producto ${query}` }
    }

    const products2 = await productModel.paginate(query, {
      limit: limit,
      page: pages,
      sort: {
        price: sort,
      },
      lean: true,
    })

    const { docs, hasPrevPage, hasNextPage, prevPage, nextPage, totalPages, page } = products2

    const prevLink = hasPrevPage ? `http://localhost:8080/views/products?page=${prevPage}&limit=${limit}&query=${query}&sort=${sort}` : null
    const nextLink = hasNextPage ? `http://localhost:8080/views/products?page=${nextPage}&limit=${limit}&query=${query}&sort=${sort}` : null

    res.status(200).send({
      status: "success",
      payload: docs,
      totalPages,
      page,
      prevPage,
      nextPage,
      hasPrevPage,
      hasNextPage,
      prevLink,
      nextLink,
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
