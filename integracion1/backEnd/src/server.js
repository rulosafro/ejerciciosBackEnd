const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')
const cors = require('cors')
const handlebars = require('express-handlebars')
const passport = require('passport')
const compression = require('express-compression')
const routerServer = require('./routes/index')
const swaggerJsDoc = require('swagger-jsdoc')
const swaggerUiExpress = require('swagger-ui-express')
// const { Server } = require('socket.io')
const { initPassportGithub, initPassportMid, initPassportJWT } = require('./config/passport.config.js')
const { errorHandler } = require('./middlewares/errorMiddleware.js')
const { port } = require('./config/objectConfig.js')

const PORT = port || 8080

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(compression())

const { Server: ServerHTTP } = require('http')
const { Server: ServerIO } = require('socket.io')
const { socketMessage } = require('./utils/socketMessage.js')
const { logger, addLogger } = require('./config/logger.js')
const serverHttp = ServerHTTP(app)
const io = new ServerIO(serverHttp)
// const io = new Server(httpServer)

// HBS----------------------------------------------------------------
app.engine('hbs', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'hbs')

// CookieParser & Morgan----------------------------------------------------------------
app.use(cookieParser(process.env.SECRET_KEY))
app.use(addLogger)
// app.use(logger('dev'))

// Swaggerr
const swaggerOptions = {
  definition: {
    openapi: '3.0.1',
    info: {
      title: 'Documentación de WatchWorld',
      description: 'Ecommerce para la venta de relojeria'
    }
  },
  apis: [`${__dirname}/docs/**/*.yaml`]
}

const specs = swaggerJsDoc(swaggerOptions)
app.use('/docs', swaggerUiExpress.serve, swaggerUiExpress.setup(specs))

// LOGIN----------------------------------------------------------------
initPassportJWT()
initPassportMid()
initPassportGithub()
passport.use(passport.initialize())

// ROUTER & LISTENER & ChatWeb----------------------------------------------------------------
app.use(routerServer)
app.use(errorHandler)
socketMessage(io)

app.listen(PORT, (err) => {
  if (err) logger.info('error en el servidor', err)
  logger.info(`Escuchanding port: ${PORT}`)
})

// exports.initServer = () => serverHttp.listen(PORT, (err) => {
//   if (err) logger.info('error en el servidor', err)
//   logger.info(`Escuchanding port: ${PORT}`)
// })
