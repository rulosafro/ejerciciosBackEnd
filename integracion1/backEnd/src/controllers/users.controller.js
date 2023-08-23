const { userModel } = require('../Daos/mongo/models/user.model')
const { logger } = require('../config/logger')
const { userService } = require('../service/index.service')

class UserController {
  constructor () {
    this.userService = userService
  }

  getUsers = async (req, res, next) => {
    try {
      const users = await userService.get()
      const prueba1 = users.slice(0, 20)
      const { page = 1 } = req.query

      res.status(200).send({
        status: 'success',
        payload: users
      })
    } catch (error) {
      next(error)
    }
  }

  getUserById = async (req, res, next) => {
    try {
      const { uid } = req.params
      const product = await userService.getByID(uid)
      res.status(200).send({
        status: 'success',
        payload: product
      })
    } catch (error) {
      next(error)
    }
  }

  getUserByMail = async (req, res, next) => {
    try {
      const data = await userService.getByMail(mail)
      res.status(200).send({
        status: 'success',
        payload: data
      })
    } catch (error) {
      next(error)
    }
  }

  createUser = async (req, res, next) => {
    try {
      const newUser = req.body
      const usuarioNuevo = await userService.add(newUser)
      res.status(200).send({
        status: 'success',
        payload: usuarioNuevo
      })
    } catch (error) {
      next(error)
    }
  }

  documentsUser = async (req, res, next) => {
    try {
      res.render('home', { message: 'carga exitosa', style: 'text-white' })
      // res.render('formData', { dataUser })
    } catch (error) {
      next(error)
    }
  }

  changeUserPremium = async (req, res, next) => {
    try {
      const { uid } = req.params
      const user = await userService.getByID(uid)
      // console.log('🚀 ~ file: users.controller.js:76 ~ UserController ~ changeUserPremium= ~ user:', user.documents)
      let cambio
      const lock1 = user.documents.some(doc => doc.reference === `Document-Identificacion-${uid}`)
      const lock2 = user.documents.some(doc => doc.reference === `Document-ComprobanteDomicilio-${uid}`)
      const lock3 = user.documents.some(doc => doc.reference === `Document-ComprobanteCuenta-${uid}`)

      if (lock1 && lock2 && lock3) {
        user.role === 'user' ? cambio = { role: 'premium' } : cambio = { role: 'user' }
        user.role === 'premium' ? cambio = { role: 'user' } : cambio = { role: 'premium' }
        const modificado = await userService.update(uid, cambio)
        const user2 = await userService.getByID(uid)
        return res.status(200).send({ status: 'success', modificado, payload: user2 })
      }
      res.send({ status: 'denied', message: 'Es necesario subir los documentos de Identificación, Comprobante de domicilio y Comprobante de estado de cuenta para hacer el upgrade de este cuenta' })
    } catch (error) {
      next(error)
    }
  }

  updateUser = async (req, res, next) => {
    try {
      const { uid } = req.params
      const cambio = req.body
      const modificado = await userService.update(uid, cambio)
      res.status(200).send({
        status: 'success',
        payload: modificado
      })
    } catch (error) {
      next(error)
    }
  }

  deleteUser = async (req, res, next) => {
    try {
      const { uid } = req.params
      const quitar = await userService.delete(uid)
      res.status(200).send({
        status: 'success',
        payload: quitar
      })
    } catch (error) {
      next(error)
    }
  }
}

module.exports = new UserController()
