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
const mockRouter = require('./mock.router')
const apiSessionRouter = require('./example/api.session.router')
const messagesRouter = require('./messages.router')
const cookieRouter = require('./cookie.router')

const { passportCall } = require('../middlewares/passportCall')
const { authorization } = require('../middlewares/authorizationJwtRole')

const midUser = [passportCall('jwt'), authorization('user')]
const midAdmin = [passportCall('jwt'), authorization('admin')]
const midJWT = [passportCall('jwt')]
// const midUser = []
// const midAdmin = []

router.use('/', homeRouter)
router.use('/views', viewsRouter)
router.use('/passport', passportRouter)
router.use('/github', githubRouter)
router.use('/static', express.static(__dirname + './../public'))

router.use('/api/payments', paymentRouter)
router.use('/api/products', apiProductsRouter)
router.use('/api/carts', apiCartsRouter) // Validacion interna
router.use('/api/users', apiUsuariosRouter)
router.use('/chat', midUser, contactsRouter)
router.use('/contacts', midUser, contactsRouter)
router.use('/tickets', ticketsRouter)
router.use('/recuperar', contrasenaRouter)
router.use('/pruebas', pruebasRouter)

router.use('/loggerTest', loggerRouter)
// router.use('/mockingproducts', mockRouter)
// router.use("/cookie", cookieRouter)
// router.use("/messages", messagesRouter)
// const NewUsersRouter = require("./example/3newUser.Router")

module.exports = router
