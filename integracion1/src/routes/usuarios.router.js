const { Router } = require("express")
const userManager = require("../dao/mongo/user.mongo")

const router = Router()

router.get("/", async (req, res) => {
  try {
    let users = await userManager.getUsers()
    let prueba1 = users.slice(0, 20)
    console.log(prueba1)

    res.status(200).render("users", { prueba1 })
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

router.get("/namelook/:nombre", async (req, res) => {
  try {
    const { name } = req.params
    // let product = await userManager.getUsersByID(name)
    // res.status(200).send({
    //   status: "success",
    //   payload: product,
    // })
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
    const modificado = await userManager.updateUser(uid, cambio)
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
