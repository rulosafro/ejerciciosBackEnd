const express = require("express")
const cookieParser = require("cookie-parser")
const handlebars = require("express-handlebars")
const multer = require("./utils/multer")

const ProductManager = require("./managerDaos/ProductManager3")
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
  res.send('<h1 style="color: blue;"> HolaCoders </h1>')
})

// Estan creando una carpeta virtual que contiene la ruta
app.use("/static", express.static(__dirname + "/public"))

//http://localhost:{PORT}/api/usuarios
app.use("/api/usuarios", userRouter)

//http://localhost:{PORT}/api/productos
app.use("/api/productos", productRouter)

//http://localhost:{PORT}/api/cart
app.use("/api/cart", cartRouter)

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

app.listen(PORT, () => {
  console.log(`Escuchando el puerto ${PORT}`)
})
