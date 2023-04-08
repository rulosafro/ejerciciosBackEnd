const { Router } = require("express")

const router = Router()

router.get("/", (req, res) => {})

module.exports = router

router.get("/usuarios", (req, res) => {
  console.log(req.query)
  const { genero } = req.query

  if (!genero || genero != "M" || genero != "F") {
    return res.send({ usuarios })
  }

  let userFilter = usuarios.filter((usuario) => usuario.genero == genero)

  res.send({ userFilter })
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
