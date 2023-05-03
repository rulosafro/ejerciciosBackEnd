const express = require("express")
const cookieParser = require("cookie-parser")
const handlebars = require("express-handlebars")
const multer = require("./utils/multer")
const { Server } = require("socket.io")

const ProductManager = require("./managerDaos/ProductManager3")
const CartManager = require("./managerDaos/CartManager")
const productRouter = require("./routes/products.router")
const userRouter = require("./routes/users.router")
const cartRouter = require("./routes/cart.router")
const viewsRouter = require("./routes/views.router")
const app = express()
const PORT = 8080

//hbs-----------------
app.engine("handlebars", handlebars.engine())
app.set("views", __dirname + "/views")
app.set("view engine", "handlebars")
//----------------------------

app.use(express.json()) // Permite que lleguen los datos en formato JSON
app.use(express.urlencoded({ extended: true }))

// Middlewares de terceros, por investigar
app.use(cookieParser())

app.get("/", (req, res) => {
  res.send('<h1 style=""> HolaCoders </h1>')
})

// Estan creando una carpeta virtual que contiene la ruta
app.use("/static", express.static(__dirname + "/public"))

//http://localhost:{PORT}/api/usuarios
app.use("/api/usuarios", userRouter)

//http://localhost:{PORT}/api/productos
app.use("/api/products", productRouter)

//http://localhost:{PORT}/api/cart
app.use("/api/carts", cartRouter)

//http://localhost:{PORT}/api/usuarios
app.use("/", viewsRouter)

//----------------------------------------------------------------

app.post("/single", multer.single("myfile"), (req, res) => {
  res.status(200).send({
    status: "success",
    message: "Subido correctamente",
  })
})

//----------------------------------------------------------------

const httpServer = app.listen(PORT, () => {
  console.log(`Escuchando el puerto ${PORT}`)
})

const io = new Server(httpServer)

let messages = []

io.on("connection", (socket) => {
  console.log("nuevo cliente conectado")
  socket.on("message", (data) => {
    console.log(data)
    messages.push(data)
    io.emit("messageLogs", messages)
  })

  // let logs = []
  // socket.on("message1", (data) => {
  //   io.emit("log", data)
  // })

  // socket.on("message2", (data) => {
  //   logs.push({ socketid: socket.id, message: data })
  //   io.emit("log", { logs })
  // })
})

app.use((err, req, res, next) => {
  console.log(err)
  res.status(500).send("hay un o + errores")
})

//----------------------------------------------------------------

// escuchar mensaje
// socket.on("message", (message) => {
//   console.log(message)
// })

//emitir mensaje
// socket.emit("evento-de-ida", "prueba de envio")

// socket.broadcast.emit("evt-para-todos", "evento para todos los socket menos el que emitio")

//eventos para todos incluido el emisor
// io.emit("evento-general", "eventos para todos incluido el emisor")
