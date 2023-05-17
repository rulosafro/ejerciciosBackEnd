const { Router } = require("express")
const { userModel } = require("../dao/mongo/models/user.model")
const router = Router()

router.get("/counter", (req, res) => {
  if (req.session.counter) {
    req.session.counter++
    res.send(`se ha visitado el sitio ${req.session.counter}`)
  } else {
    req.session.counter = 1
    res.send("bienvenido")
  }
})

router.post("/login", async (req, res) => {
  const { email, password } = req.body
  const userDB = await userModel.findOne({ email, password })
  if (!userDB) return res.send({ status: "error", message: "No existe ese usuario" })

  req.session.user = {
    first_name: userDB.first_name,
    last_name: userDB.last_name,
    email: userDB.email,
    role: "admin",
  }

  res.send({ status: "success", message: "login success", session: req.session.user })
})

router.post("/register", async (req, res) => {
  try {
    const { username, first_name, last_name, email, password } = req.body
    const existUser = await userModel.findOne({ email })
    if (existUser) return res.send({ status: "error", message: "el email ya está registrado" })

    const newUser = { username, first_name, last_name, email, password }
    let resultUser = await userModel.create(newUser)

    res.status(200).send({ status: "success", message: "register exitoso", resultUser })
  } catch (error) {
    console.log(error)
  }
})

router.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.send({ status: "error", error: err })
    }
    res.send("logout ok")
  })
})

module.exports = router
