const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const compression = require('express-compression')
const swaggerJsDoc = require('swagger-jsdoc')
const app = express()
const handlebars = require('express-handlebars')
const passport = require('passport')
const routerServer = require('./routes/index')
const swaggerUiExpress = require('swagger-ui-express')
const { errorHandler } = require('./middlewares/errorMiddleware.js')
const { initPassportGithub, initPassportMid, initPassportJWT } = require('./config/passport.config.js')
// const { Server } = require('socket.io')
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

// Swagger
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

// SESSIONS----------------------------------------------------------------
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
