const { logger } = require('../config/logger')
const { userService } = require('../service/index.service')
// const userManager = require("../Daos/mongo/user.mongo")
// const { userModel } = require("../Daos/mongo/models/user.model")

class UserController {
  getUsers = async (req, res) => {
    try {
      const users = await userService.get()
      const prueba1 = users.slice(0, 20)
      const { page = 1 } = req.query

      res.status(200).send({
        status: 'success',
        payload: users
      })
    } catch (error) {
      logger.error(error)
    }
  }

  getUserById = async (req, res) => {
    try {
      const { uid } = req.params
      const product = await userService.getByID(uid)
      res.status(200).send({
        status: 'success',
        payload: product
      })
    } catch (error) {
      logger.error(error)
    }
  }

  createUser = async (req, res) => {
    try {
      const newUser = req.body
      const usuarioNuevo = await userService.add(newUser)
      res.status(200).send({
        status: 'success',
        payload: usuarioNuevo
      })
    } catch (error) {
      logger.error(error)
    }
  }

  updateUser = async (req, res) => {
    try {
      const { uid } = req.params
      const cambio = req.body
      const modificado = await userService.update(uid, cambio)
      res.status(200).send({
        status: 'success',
        payload: modificado
      })
    } catch (error) {
      logger.error(error)
    }
  }

  deleteUser = async (req, res) => {
    try {
      const { uid } = req.params
      const quitar = await userService.delete(uid)
      res.status(200).send({
        status: 'success',
        payload: quitar
      })
    } catch (error) {
      logger.error(error)
    }
  }
}

module.exports = new UserController()
