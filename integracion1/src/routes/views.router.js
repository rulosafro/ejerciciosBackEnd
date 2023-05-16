const { Router } = require("express")
const productManager = require("../dao/mongo/product.mongo.js")
const userManager = require("../dao/mongo/user.mongo")
const { uploader } = require("../utils/multer")
const { productModel } = require("../dao/mongo/models/product.model.js")
const { userModel } = require("../dao/mongo/models/user.model")
const cartsManager = require("../dao/mongo/carts.mongo")

const router = Router()

router.get("/users", async (req, res) => {
  try {
    let users = await userManager.getUsers()

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
    const productos = await productManager.getProducts()
    const { pages = 1, limit = 10, sort, query } = req.query
    const products2 = await productModel.paginate({}, { limit: limit, page: pages, lean: true })
    const { docs, hasPrevPage, hasNextPage, prevPage, nextPage, totalPages, page } = products2
    res.status(200).render("products", {
      status: "success",
      payload: docs,
      totalPages,
      page,
      prevPage,
      nextPage,
      hasPrevPage,
      hasNextPage,
      hasPrevPage,
      hasNextPage,
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
