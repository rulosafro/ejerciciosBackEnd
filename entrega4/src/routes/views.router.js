const { Router } = require("express")
const { isRegularExpressionLiteral } = require("typescript")

const router = Router()

//Datos
let food = [
  { id: "1", nombre: "Pizza0", precio: 10 },
  { id: "2", nombre: "Pizza1", precio: 11 },
  { id: "3", nombre: "Pizza2", precio: 12 },
  { id: "4", nombre: "Pizza3", precio: 13 },
  { id: "5", nombre: "Pizza4", precio: 14 },
]

const users = [
  {
    nombre: "Juana1",
    apellido: "Perez1",
    edad: 251,
    correo: "upchh@example.com1",
    telefono: "1234567891",
    role: "admin",
  },
  {
    nombre: "Juan2",
    apellido: "Perez2",
    edad: 252,
    correo: "upchh@example.com2",
    telefono: "1234567892",
    role: "user",
  },
  {
    nombre: "Juan3",
    apellido: "Perez3",
    edad: 253,
    correo: "upchh@example.com3",
    telefono: "1234567893",
    role: "admin",
  },
  {
    nombre: "Juan4",
    apellido: "Perez4",
    edad: 254,
    correo: "upchh@example.com4",
    telefono: "1234567894",
    role: "user",
  },
  {
    nombre: "Juan5",
    apellido: "Perez5",
    edad: 255,
    correo: "upchh@example.com5",
    telefono: "1234567895",
    role: "user",
  },
  {
    nombre: "Juan6",
    apellido: "Perez6",
    edad: 256,
    correo: "upchh@example.com6",
    telefono: "1234567896",
    role: "admin",
  },
]

router.get("/", (req, res) => {
  let user = users[Math.floor(Math.random() * users.length)]

  let testUser = {
    title: "ecommerce",
    user,
    isAdmin: user.role === "admin",
    food,
    style: "index.css",
  }

  res.render("index", testUser)
})

router.get("/register", (req, res) => {
  res.render("registerForm")
})

router.post("/register", (req, res) => {
  const { nombre, apellido, edad, correo, telefono } = req.body
  res.send({
    name,
    email,
    password,
    mensaje: "Registro con Exito",
  })
})

module.exports = router
