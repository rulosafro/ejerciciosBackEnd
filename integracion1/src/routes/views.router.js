const { Router } = require("express")
const { uploader } = require("../utils/multer")
const { productModel } = require("../dao/mongo/models/product.model.js")
const { userModel } = require("../dao/mongo/models/user.model")
const cartsManager = require("../dao/mongo/carts.mongo")
const { auth } = require("../middlewares/autentication.middleware")
const { auth2 } = require("../middlewares/autentication2.middleware")

const router = Router()

router.get("/users", auth2, async (req, res) => {
  try {
    const { page = 1 } = req.query
    let users2 = await userModel.paginate({}, { limit: 10, page: page, lean: true })
    const { docs, hasPrevPage, hasNextPage, prevPage, nextPage } = users2

    res.status(200).render("users", {
      status: "success",
      data: docs,
      hasPrevPage,
      hasNextPage,
      prevPage,
      nextPage,
    })
  } catch (error) {
    console.log(error)
  }
})

router.get("/products", auth, async (req, res) => {
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

    // console.log(req.session.user)
    const dataUser = req.session.user

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
      dataUser,
    })
  } catch (error) {
    console.log({ status: "error", error })
  }
})

router.get("/realtime", auth, (req, res) => {
  res.render("realTimeProducts", {})
})

router.get("/carts", auth, async (req, res) => {
  try {
    const carts = await cartsManager.getCarts()
    res.status(200).render("carts", { carts })
  } catch (error) {
    console.log(error)
  }
})

router.get("/carts/:cid", auth, async (req, res) => {
  try {
    const { cid } = req.params
    let carrito = await cartsManager.getCartsByID(cid)
    if (!carrito) {
      res.status(404).send("ID no identificado")
    }
    // let shop = carrito.products
    console.log(carrito)
    res.status(200).render("cartsById", { carrito, cid })
  } catch (error) {
    console.log(error)
  }
})

router.get("/register", (req, res) => {
  res.status(200).render("registerForm", {})
})

router.get("/login", (req, res) => {
  res.status(200).render("login", {})
})

router.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.send({ status: "error", error: err })
    }
    res.render("login", {
      message: "Se ha cerrado sesión",
      style: "text-danger",
    })
  })
})

router.post("/upload", uploader.single("myFile"), (req, res) => {
  res.send({
    status: "success",
    mensaje: "Archivo subido ",
  })
})

module.exports = router