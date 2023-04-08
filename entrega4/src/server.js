// const express = require("express")
import express, { request } from "express"
// import { productRouter } from "./routes/products.router.js"
const userRouter = require("./routes/users.router.js")
const productRouter = require("./routes/product.router.js")

const app = express()
const PORT = 8080

let usuarios = [
  { id: "1", nombre: "Jav 1", apellido: "Ram1", genero: "M" },
  { id: "2", nombre: "Jav 2", apellido: "Ram2", genero: "F" },
  { id: "3", nombre: "Jav 3", apellido: "Ram3", genero: "F" },
  { id: "4", nombre: "Jav 4", apellido: "Ram4", genero: "M" },
  { id: "5", nombre: "Jav 5", apellido: "Ram5", genero: "F" },
  { id: "6", nombre: "Jav 6", apellido: "Ram6", genero: "F" },
]

app.use(express.json()) // Permite que lleguen los datos en formato JSON
app.use(express.urlencoded({ extended: true }))

app.use("/static", express.static(__dirname + "public"))

//http://localhost:{PORT}/api/usuarios
app.use("/", (res, req) => {
  res.send("root")
})

//http://localhost:{PORT}/api/usuarios
app.use("/api/usuarios", userRouter)

//http://localhost:{PORT}/api/usuarios
app.use("/api/productos", productRouter)

//http://localhost:{PORT}/api/usuarios
app.use("/api/", userRouter)

//----------------------------------------------------------------

app.get("/:idUsuario", (req, res) => {
  const { idUsuario } = req.params
  const usuario = usuarios.find((user) => user.id === req.params.idUsuario)
  if (!usuario) return res.send({ error: "No se encuentra el usuario" })
  res.send({ usuario })
})

app.get("/bienvenida", (req, res) => {
  res.send('<h1 style="color: blue;"> HolaCoders </h1>')
})

app.get("/usuario/:nombre", (req, res) => {
  console.log(req.params)
  res.send({ nombre: req.params.nombre, apellido: "eminem", correo: "a@a.com" })
})

app.get("/usuario/:nombre/:apellido", (req, res) => {
  console.log(req.params)
  res.send({ nombre: req.params.nombre, apellido: req.params.apellido, correo: "a@a.com" })
})

//----------------------------------------------------------------

app.listen(PORT, () => {
  console.log(`Escuchando el puerto ${PORT}`)
})
