const express = require("express")
const { Router } = require("express")
const router = Router()

const apiUsuariosRouter = require("./api.usuarios.router")
const NewUsersRouter = require("./2newUser.Router")
const apiProductsRouter = require("./api.products.router")
const apiCartsRouter = require("./api.carts.router")
const messagesRouter = require("./messages.router")
const viewsRouter = require("./views.router")
const sessionRouter = require("./session.router")
const apiSessionRouter = require("./api.session.router")
const cookieRouter = require("./cookie.router")
const pruebasRouter = require("./pruebas.router")
const homeRouter = require("./home.router")

const { auth } = require("../middlewares/autentication.middleware")
const { authToken } = require("../utils/jwt")
const { authorization } = require("../passport-jwt/authorizationJwtRole")
const passportCall = require("../passport-jwt/passportCall")

const userRouter2 = new NewUsersRouter()

router.use("/", homeRouter) //validacion adentro del router
router.use("/static", passportCall("jwt"), authorization("user"), express.static(__dirname + "./../public"))
router.use("/api/products", passportCall("jwt"), authorization("user"), apiProductsRouter)
router.use("/api/users", passportCall("jwt"), authorization("user"), apiUsuariosRouter)
router.use("/api/carts", passportCall("jwt"), authorization("user"), apiCartsRouter)
router.use("/api/session", apiSessionRouter)
router.use("/chat", passportCall("jwt"), authorization("user"), messagesRouter)
router.use("/session", sessionRouter)
router.use("/views", viewsRouter)

// router.use("/cookie", cookieRouter)
// router.use("/pruebas", pruebasRouter)

router.use("/api/users2", userRouter2.getRouter())

module.exports = router
