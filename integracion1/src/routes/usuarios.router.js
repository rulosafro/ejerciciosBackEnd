const { Router } = require("express")
const userManager = require("../dao/mongo/user.mongo")

const router = Router()

router.get("/", async (req, res) => {
  try {
    let users = await userManager.getUsers()
    res.status(200).send({
      status: "success",
      payload: users,
    })
  } catch (error) {
    console.log(error)
  }
})

router.get("/:uid", async (req, res) => {
  try {
    const { uid } = req.params
    let product = await userManager.getUsersByID(uid)
    res.status(200).send({
      status: "success",
      payload: product,
    })
  } catch (error) {
    console.log(error)
  }
})

router.post("/", async (req, res) => {
  try {
    const newUser = req.body
    let usuarioNuevo = await userManager.addUser(newUser)
    res.status(200).send({
      status: "success",
      payload: usuarioNuevo,
    })
  } catch (error) {
    console.log(error)
  }
})

router.put("/:uid", async (req, res) => {
  try {
    const { uid } = req.params
    const cambio = req.body
    const modificado = await userManager.upadteUser(uid, cambio)
    res.status(200).send({
      status: "success",
      payload: modificado,
    })
  } catch (error) {
    console.log(error)
  }
})

router.delete("/:uid", async (req, res) => {
  try {
    const { uid } = req.params
    const quitar = await userManager.deleteUser(uid)
    res.status(200).send({
      status: "success",
      payload: quitar,
    })
  } catch (error) {
    console.log(error)
  }
})

module.exports = router
