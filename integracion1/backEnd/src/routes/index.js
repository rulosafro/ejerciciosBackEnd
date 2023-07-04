const express = require("express")
const { Router } = require("express")

const homeRouter = require("./home.router")
const apiUsuariosRouter = require("./api.usuarios.router")
const apiProductsRouter = require("./api.products.router")
const apiCartsRouter = require("./api.carts.router")
const viewsRouter = require("./views.router")
const sessionRouter = require("./session.router")
const apiSessionRouter = require("./api.session.router")
const contactsRouter = require("./contacts.router")
const messagesRouter = require("./messages.router")
const cookieRouter = require("./cookie.router")
const pruebasRouter = require("./others/pruebas.router")
const ticketsRouter = require("./tickets.router")

const router = Router()
const passportCall = require("../middlewares/passportCall")
const { authorization } = require("../middlewares/authorizationJwtRole")

const midUser = [passportCall("jwt"), authorization("user")]
const midAdmin = [passportCall("jwt"), authorization("admin")]
// const midUser = []

router.use("/", homeRouter) //validacion adentro del router
router.use("/views", viewsRouter)
router.use("/session", sessionRouter)
router.use("/static", express.static(__dirname + "./../public"))

router.use("/api/products", apiProductsRouter)
router.use("/api/users", midAdmin, apiUsuariosRouter)
router.use("/api/carts", midAdmin, apiCartsRouter)
router.use("/current", midUser, apiSessionRouter)
router.use("/chat", midUser, contactsRouter)
router.use("/contacts", midUser, contactsRouter)
// router.use("/tickets", midAdmin, ticketsRouter)
router.use("/tickets", ticketsRouter)

router.use("/pruebas", pruebasRouter)
// router.use("/cookie", cookieRouter)
// router.use("/messages", messagesRouter)

// router.use("/api/session", midUser, apiSessionRouter)
// const NewUsersRouter = require("./example/3newUser.Router")
// const userRouter2 = new NewUsersRouter()
// router.use("/api/users2", userRouter2.getRouter())

module.exports = router
