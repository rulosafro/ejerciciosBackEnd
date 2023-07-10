const express = require("express")
const cookieParser = require("cookie-parser")
const logger = require("morgan")
const cors = require("cors")
const handlebars = require("express-handlebars")
const passport = require("passport")
const dotenv = require("dotenv")
const compression = require("express-compression")

const routerServer = require("./routes/index.js")
const { Server } = require("socket.io")
const { productService } = require("./service/index.service")
const { connectDB } = require("./config/objectConfig.js")
const { initPassportGithub, initPassportMid, initPassportJWT } = require("./config/passport.config.js")
const { errorHandler } = require("./middlewares/errorMiddleware.js")
const ProductManagerMongo = require("./Daos/mongo/product.mongo.js")

dotenv.config()
connectDB()

const app = express()
const PORT = process.env.PORT || 8080

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(compression())

// HBS----------------------------------------------------------------
app.engine("hbs", handlebars.engine())
app.set("views", __dirname + "/views")
app.set("view engine", "hbs")

// CookieParser & Morgan----------------------------------------------------------------
app.use(logger("dev"))
app.use(cookieParser(process.env.SECRET_KEY))

//LOGIN----------------------------------------------------------------
initPassportJWT()
initPassportMid()
initPassportGithub()
passport.use(passport.initialize())

// ROUTER & LISTENER----------------------------------------------------------------
app.use(routerServer)
// app.use(errorHandler)
 
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
  let products = await productService.get()
  // let products = await ProductManagerMongo.getProducts()

  socket.emit("productos", products)

  socket.on("addProduct", (data) => {
    console.log(data)
    products.push(data)
  })
})




