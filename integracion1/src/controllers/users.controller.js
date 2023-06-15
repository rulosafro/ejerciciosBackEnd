const { userService } = require("../service/index.service")
// const userManager = require("../Daos/mongo/user.mongo")
// const { userModel } = require("../Daos/mongo/models/user.model")

class UserController {
  getUsers = async (req, res) => {
    try {
      let users = await userService.getUsers()
      let prueba1 = users.slice(0, 20)
      const { page = 1 } = req.query

      res.status(200).send({
        status: "success",
        payload: users,
      })
    } catch (error) {
      console.log(error)
    }
  }

  getUsersById = async (req, res) => {
    try {
      const { uid } = req.params
      let product = await userService.getUsersByID(uid)
      res.status(200).send({
        status: "success",
        payload: product,
      })
    } catch (error) {
      console.log(error)
    }
  }
  createUsers = async (req, res) => {
    try {
      const newUser = req.body
      let usuarioNuevo = await userService.addUser(newUser)
      res.status(200).send({
        status: "success",
        payload: usuarioNuevo,
      })
    } catch (error) {
      console.log(error)
    }
  }

  updateUsers = async (req, res) => {
    try {
      const { uid } = req.params
      const cambio = req.body
      const modificado = await userService.updateUser(uid, cambio)
      res.status(200).send({
        status: "success",
        payload: modificado,
      })
    } catch (error) {
      console.log(error)
    }
  }

  deleteUsers = async (req, res) => {
    try {
      const { uid } = req.params
      const quitar = await userService.deleteUser(uid)
      res.status(200).send({
        status: "success",
        payload: quitar,
      })
    } catch (error) {
      console.log(error)
    }
  }
}

module.exports = new UserController()
