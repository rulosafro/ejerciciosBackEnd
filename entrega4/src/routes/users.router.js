const { Router } = require("express")

const router = Router()

let usuarios = [
  { id: "1", nombre: "Jav 1", apellido: "Ram1", genero: "M" },
  { id: "2", nombre: "Jav 2", apellido: "Ram2", genero: "F" },
  { id: "3", nombre: "Jav 3", apellido: "Ram3", genero: "F" },
  { id: "4", nombre: "Jav 4", apellido: "Ram4", genero: "M" },
  { id: "5", nombre: "Jav 5", apellido: "Ram5", genero: "F" },
  { id: "6", nombre: "Jav 6", apellido: "Ram6", genero: "F" },
]

// router.get("/", (req, res) => {})

router.get("/", (req, res) => {
  console.log(req.query)
  const { genero } = req.query

  if (!genero || genero != "M" || genero != "F") {
    return res.send({ usuarios })
  }

  let userFilter = usuarios.filter((usuario) => usuario.genero == genero)

  res.send({ userFilter })
})

router.get("/:idUsuario", (req, res) => {
  const { idUsuario } = req.params
  const usuario = usuarios.find((user) => user.id === req.params.idUsuario)
  if (!usuario) return res.send({ error: "No se encuentra el usuario" })
  res.send({ usuario })
})

router.post("/", (req, res) => {
  let user = req.body

  if (!user.nombre || !user.apellido) {
    return res.status(400).send({ error: "error", mensaje: "Todos los campos son necesarios" })
  }
  usuarios.push(user)

  res.status(200).send({ usuarios })
})

router.put("/:pid", (req, res) => {
  const { pid } = req.params
  const user = req.body

  // Validar si todos los campos son necesarios
  if (!user.nombre || !user.apellido) {
    return res.status(400).send({ error: "error", mensaje: "Todos los campos son necesarios" })
  }

  //Valida que el usuario existe
  //Buscar por pid que esta usuario
  const index = usuarios.findIndex((usuario) => usuario.id == pid)

  if (index == -1) res.send({ error: "error", mensaje: "El usuario no existe" })
  usuarios[index] = { id: pid, ...user }

  // if (!user) res.send({ error: "error", mensaje: "El usuario no existe" })

  res.send({ usuarios })
})

router.delete("/:pid", (req, res) => {
  let { pid } = req.params

  const index = usuarios.findIndex((usuario) => usuario.id == pid)
  if (index == -1) res.send({ error: "error", mensaje: "El usuario no existe" })

  usuarios = usuarios.filter((user) => user.id != pid)

  res.send({ usuarios })
})

router.get("/usuario/:nombre", (req, res) => {
  console.log(req.params)
  res.send({ nombre: req.params.nombre, apellido: "eminem", correo: "a@a.com" })
})

router.get("/usuario/:nombre/:apellido", (req, res) => {
  console.log(req.params)
  res.send({ nombre: req.params.nombre, apellido: req.params.apellido, correo: "a@a.com" })
})

module.exports = router
