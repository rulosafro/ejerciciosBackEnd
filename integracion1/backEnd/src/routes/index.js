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
const mockRouter = require('./mock.router')
const loggerRouter = require('./logger.router')
const contrasenaRouter = require('./contrasena.router')
const githubRouter = require('./github.router')
const passportRouter = require('./passport.router')
const apiSessionRouter = require('./example/api.session.router')
const messagesRouter = require('./messages.router')
const cookieRouter = require('./cookie.router')

const { passportCall } = require('../middlewares/passportCall')
const { authorization } = require('../middlewares/authorizationJwtRole')

const midUser = [passportCall('jwt'), authorization('user')]
// const midAdmin = [passportCall('jwt'), authorization('admin')]
const midJWT = [passportCall('jwt')]
// const midUser = []
const midAdmin = []

router.use('/', homeRouter)
router.use('/views', viewsRouter)
router.use('/passport', passportRouter)
router.use('/github', githubRouter)
router.use('/static', express.static(__dirname + './../public'))

router.use('/api/products', apiProductsRouter)
router.use('/api/users', midAdmin, apiUsuariosRouter)
router.use('/api/carts', midJWT, apiCartsRouter)
router.use('/chat', midUser, contactsRouter)
router.use('/contacts', midUser, contactsRouter)
router.use('/tickets', ticketsRouter)
router.use('/mockingproducts', mockRouter)
router.use('/loggerTest', loggerRouter)
router.use('/pruebas', pruebasRouter)
router.use('/recuperar', contrasenaRouter)

// router.use("/cookie", cookieRouter)
// router.use("/messages", messagesRouter)
// const NewUsersRouter = require("./example/3newUser.Router")
// const userRouter2 = new NewUsersRouter()
// router.use("/api/users2", userRouter2.getRouter())

module.exports = router
