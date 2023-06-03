const express = require("express")
const { Router } = require("express")
const apiUsuariosRouter = require("./api.usuarios.router")
const apiProductsRouter = require("./api.products.router")
const apiCartsRouter = require("./api.carts.router")
const messagesRouter = require("./messages.router")
const viewsRouter = require("./views.router")
const sessionRouter = require("./session.router")
const cookieRouter = require("./cookie.router")
const pruebasRouter = require("./pruebas.router")
const { auth } = require("../middlewares/autentication.middleware")
const { authToken } = require("../utils/jwt")
const { authorization } = require("../passport-jwt/authorizationJwtRole")
const passportCall = require("../passport-jwt/passportCall")

const router = Router()

router.get("/", passportCall("jwt"), authorization("user"), (req, res) => {
  // let user = req.session.user
  data = {
    titulo1: "Bienvenido33",
    info: "Estas entrando a la mejor tienda de relojeria",
    // user,
  }
  res.render("home", data)
})

router.use("/static", passportCall("jwt"), authorization("user"), express.static(__dirname + "./../public"))
router.use("/api/users", apiUsuariosRouter)
router.use("/api/products", apiProductsRouter)
router.use("/api/carts", apiCartsRouter)
router.use("/views", viewsRouter)
router.use("/chat", passportCall("jwt"), authorization("user"), messagesRouter)
router.use("/session", sessionRouter)
router.use("/pruebas", cookieRouter)
router.use("/pruebas", pruebasRouter)

module.exports = router
