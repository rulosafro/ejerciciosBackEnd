const express = require("express")
const session = require("express-session")
const cookieParser = require("cookie-parser")
const FileStore = require("session-file-store")
const logger = require("morgan")
const handlebars = require("express-handlebars")
const passport = require("passport")

const fileStore = FileStore(session)
const { Server } = require("socket.io")
const { create } = require("connect-mongo")

const productManager = require("./dao/mongo/product.mongo.js")
const routerServer = require("./routes/index.js")
const { connectDB } = require("./config/configServer")
const { initPassport } = require("./passport-jwt/passport.config.js")
const { initPassportMid, initPassportGithub } = require("./config/passport.config.js")

// const webChat = require("./routes/messages.router.js")

const app = express()
const PORT = 8080
connectDB()

// HBS----------------------------------------------------------------
app.engine("hbs", handlebars.engine())
app.set("views", __dirname + "/views")
app.set("view engine", "hbs")

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(logger("dev"))
app.use(cookieParser("claveDev"))
// app.use(
//   session({
//     store: create({
//       ttl: 1000,
//       mongoUrl: "mongodb+srv://rama:rama123@ecommerce.omzog5n.mongodb.net/ecommerce?retryWrites=true&w=majority",
//       mongoOptions: {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//       },
//     }),
//     secret: "claveDev",
//     resave: false,
//     saveUninitialized: false,
//   })
// )

// initPassportMid()
// initPassportGithub()
initPassport()

passport.use(passport.initialize())
// passport.use(passport.session())

app.use(routerServer)

const httpServer = app.listen(PORT, (err) => {
  if (err) console.log("error en el servidor", err)
  console.log(`Escuchanding port: ${PORT}`)
})

// chat web----------------------------------------------------------------
const io = new Server(httpServer)
let messages = []

io.on("connection", async (socket) => {
  // Chat
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
