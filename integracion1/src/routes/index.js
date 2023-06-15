const express = require("express")
const { Router } = require("express")

const homeRouter = require("./home.router")
const apiUsuariosRouter = require("./api.usuarios.router")
const apiProductsRouter = require("./api.products.router")
const apiCartsRouter = require("./api.carts.router")
const messagesRouter = require("./messages.router")
const viewsRouter = require("./views.router")
const sessionRouter = require("./session.router")
const apiSessionRouter = require("./api.session.router")
const cookieRouter = require("./cookie.router")
const pruebasRouter = require("./pruebas.router")

const passportCall = require("../middlewares/passportCall")
const { authorization } = require("../middlewares/authorizationJwtRole")
const router = Router()

const midUser = [passportCall("jwt"), authorization("user")]
// const midUser = []

router.use("/", homeRouter) //validacion adentro del router
router.use("/views", viewsRouter)
router.use("/session", sessionRouter)
router.use("/static", express.static(__dirname + "./../public"))

router.use("/api/products", midUser, apiProductsRouter)
router.use("/api/users", midUser, apiUsuariosRouter)
router.use("/api/carts", midUser, apiCartsRouter)
router.use("/api/session", midUser, apiSessionRouter)
router.use("/chat", midUser, messagesRouter)

// router.use("/cookie", cookieRouter)
// router.use("/pruebas", pruebasRouter)

const NewUsersRouter = require("./2newUser.Router")
const userRouter2 = new NewUsersRouter()
router.use("/api/users2", userRouter2.getRouter())

module.exports = router
