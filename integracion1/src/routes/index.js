const express = require("express")
const { Router } = require("express")
const apiUsuariosRouter = require("./api.usuarios.router")
const apiProductsRouter = require("./api.products.router")
const apiCartsRouter = require("./api.carts.router")
const messagesRouter = require("./messages.router")
const viewsRouter = require("./views.router")
const sessionRouter = require("./session.router")
const cookieRouter = require("./cookie.router")
const { auth } = require("../middlewares/autentication.middleware")

const router = Router()

router.get("/", (req, res) => {
  data = {
    titulo1: "Bienvenido33",
    info: "Estas entrando a la mejor tienda de relojeria",
  }
  res.render("home", data)
})

router.use("/static", express.static(__dirname + "./../public"))
router.use("/api/users", auth, apiUsuariosRouter)
router.use("/api/products", apiProductsRouter)
router.use("/api/carts", apiCartsRouter)
router.use("/views", viewsRouter)
router.use("/chat", messagesRouter)
router.use("/session", sessionRouter)
router.use("/pruebas", cookieRouter)

module.exports = router
