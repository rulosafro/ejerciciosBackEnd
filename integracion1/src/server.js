const express = require("express")
const session = require("express-session")
const cookieParser = require("cookie-parser")
const FileStore = require("session-file-store")
const logger = require("morgan")
const handlebars = require("express-handlebars")
const passport = require("passport")
const dotenv = require("dotenv")

const fileStore = FileStore(session)
const { Server } = require("socket.io")
const { create } = require("connect-mongo")

const productManager = require("./dao/mongo/product.mongo.js")
const routerServer = require("./routes/index.js")
const { connectDB } = require("./config/configServer")
const { initPassport } = require("./passport-jwt/passport.config.js")
const { initPassportMid } = require("./config/passport.config.js")
const { initPassportGithub } = require("./passport-jwt/passportGithub.config.js")

const app = express()
const PORT = 8080

dotenv.config()
connectDB()

// HBS----------------------------------------------------------------
app.engine("hbs", handlebars.engine())
app.set("views", __dirname + "/views")
app.set("view engine", "hbs")

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// CookieParser----------------------------------------------------------------
app.use(logger("dev"))
app.use(cookieParser(process.env.SECRET_KEY))

// ConnectMongo----------------------------------------------------------------
app.use(
  session({
    store: create({
      ttl: 1000,
      mongoUrl: process.env.MONGO_URL,
      mongoOptions: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
    }),
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
  })
)

//LOGIN----------------------------------------------------------------
initPassportMid()
initPassportGithub()
initPassport()

passport.use(passport.initialize())
passport.use(passport.session())

// ROUTER & LISTENER----------------------------------------------------------------
app.use(routerServer)

const httpServer = app.listen(PORT, (err) => {
  if (err) console.log("error en el servidor", err)
  console.log(`Escuchanding port: ${PORT}`)
})

// CHAT WEB----------------------------------------------------------------
const io = new Server(httpServer)
let messages = []

io.on("connection", async (socket) => {
  socket.on("message", (data) => {
    console.log(data)
    messages.push(data)
    io.emit("messageLogs", messages)
  })

  socket.on("authenticated", (data) => {
    socket.broadcast.emit("newUserConnected", data)
  })

  //Product
  let products = await productManager.getProducts()
  socket.emit("productos", products)

  socket.on("addProduct", (data) => {
    console.log(data)
    products.push(data)
  })
})
