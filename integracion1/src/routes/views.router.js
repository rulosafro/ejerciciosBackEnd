const { Router } = require("express")
const { uploader } = require("../utils/multer")
const { productModel } = require("../dao/mongo/models/product.model.js")
const { userModel } = require("../dao/mongo/models/user.model")
const cartsManager = require("../dao/mongo/carts.mongo")

const router = Router()

router.get("/users", async (req, res) => {
  try {
    const { page = 1 } = req.query
    let users2 = await userModel.paginate({}, { limit: 10, page: page, lean: true })
    const { docs, hasPrevPage, hasNextPage, prevPage, nextPage } = users2

    res.status(200).render("users", { status: "success", data: docs, hasPrevPage, hasNextPage, prevPage, nextPage })
  } catch (error) {
    console.log(error)
  }
})

router.get("/products", async (req, res) => {
  try {
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

    res.status(200).render("products", {
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
    console.log({ status: "error", error })
  }
})

router.get("/realtime", (req, res) => {
  res.render("realTimeProducts", {})
})

router.get("/carts", async (req, res) => {
  try {
    const carts = await cartsManager.getCarts()
    res.status(200).render("carts", { carts })
  } catch (error) {
    console.log(error)
  }
})

router.get("/carts/:cid", async (req, res) => {
  try {
    const { cid } = req.params
    const carrito = await cartsManager.getCartsByID(cid)
    const shop = carrito.products
    res.status(200).render("cartsById", { shop, cid })
  } catch (error) {
    console.log(error)
  }
})

router.get("/register", (req, res) => {
  res.status(200).render("registerForm", {})
})

router.post("/upload", uploader.single("myFile"), (req, res) => {
  res.send({
    status: "success",
    mensaje: "Archivo subido ",
  })
})

module.exports = router
