const express = require('express')
const { Router } = require('express')
const router = Router()

const homeRouter = require('./home.router')
const apiUsuariosRouter = require('./api.usuarios.router')
const apiProductsRouter = require('./api.products.router')
const apiCartsRouter = require('./api.carts.router')
const viewsRouter = require('./views.router')
const contactsRouter = require('./contacts.router')
const pruebasRouter = require('./example/pruebas.router')
const ticketsRouter = require('./tickets.router')
const loggerRouter = require('./logger.router')
const contrasenaRouter = require('./contrasena.router')
const githubRouter = require('./github.router')
const passportRouter = require('./passport.router')
const paymentRouter = require('./payment.route')
const messagesRouter = require('./messages.router')
// const mockRouter = require('./mock.router')
// const apiSessionRouter = require('./example/api.session.router')https://www.gravatar.com/avatar/2434991dc34dd1ae325f07bf5350b034?s=64&d=robohash
// const cookieRouter = require('./cookie.router')
router.use('/static', express.static(__dirname + './../public'))

router.use('/', homeRouter)
router.use('/views', viewsRouter)
router.use('/sessions', passportRouter)
router.use('/github', githubRouter)

router.use('/api/products', apiProductsRouter)
router.use('/api/carts', apiCartsRouter) // Validacion interna
router.use('/api/users', apiUsuariosRouter)

router.use('/tickets', ticketsRouter)
router.use('/api/payments', paymentRouter)

router.use('/chat', messagesRouter)
router.use('/contacts', contactsRouter)
router.use('/recuperar', contrasenaRouter)
router.use('/pruebas', pruebasRouter)
router.use('/loggerTest', loggerRouter)
// router.use('/mockingproducts', mockRouter)
// router.use("/cookie", cookieRouter)
// router.use("/messages", messagesRouter)
// const NewUsersRouter = require("./example/3newUser.Router")

module.exports = router
