const express = require("express")
const logger = require("morgan")
const routerServer = require("./routes/index.js")
const handlebars = require("express-handlebars")
const productManager = require("./dao/mongo/product.mongo.js")
const { connectDB } = require("./config/configServer")
const { Server } = require("socket.io")
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

app.use(routerServer)

const httpServer = app.listen(PORT, (err) => {
  if (err) console.log("error en el servidor", err)
  console.log(`Escuchanding port: ${PORT}`)
})

// app.use(webChat)

// chat web----------------------------------------------------------------
const io = new Server(httpServer)

let messages = []

io.on("connection", async (socket) => {
  // console.log("Nuevo cliente")

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
