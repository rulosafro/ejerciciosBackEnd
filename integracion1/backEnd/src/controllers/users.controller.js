const { userModel } = require('../Daos/mongo/models/user.model')
const { logger } = require('../config/logger')
const objectConfig = require('../config/objectConfig')
const { userService } = require('../service/index.service')
const { sendMail } = require('./../utils/sendmail')

class UserController {
  constructor () {
    this.userService = userService
  }

  getUsers = async (req, res, next) => {
    try {
      const users = await userService.get()
      const result = users.map(el => {
        const obj = {}
        Object.entries(el).forEach(([key, val]) => {
          if (key !== 'password' && key !== 'cart' && key !== '_id' && key !== 'documents' && key !== '__v') { obj[key] = val }
        })
        return obj
      })
      const { page = 1 } = req.query

      res.status(200).send({
        status: 'success',
        payload: result
      })
    } catch (error) {
      next(error)
    }
  }

  getUserById = async (req, res, next) => {
    try {
      const { uid } = req.params
      const user = await userService.getByID(uid)

      res.status(200).send({
        status: 'success',
        payload: user
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
      const lock1 = user.documents.some(doc => doc.reference === `Document-Identificacion-${uid}`)
      const lock2 = user.documents.some(doc => doc.reference === `Document-ComprobanteDomicilio-${uid}`)
      const lock3 = user.documents.some(doc => doc.reference === `Document-ComprobanteCuenta-${uid}`)

      if (user.role === 'premium') {
        const modificado = await userService.update(uid, { role: 'user' })
        return res.status(200).send({ status: 'success', payload: modificado })
      } else if (user.role === 'user') {
        if (lock1 && lock2 && lock3) {
          const modificado = await userService.update(uid, { role: 'premium' })
          return res.status(200).send({ status: 'success', payload: modificado })
        } else {
          res.send({ status: 'denied', message: 'Es necesario subir los documentos de Identificación, Comprobante de domicilio y Comprobante de estado de cuenta para hacer el upgrade de este cuenta' })
        }
      } else {
        res.send({ status: 'denied', message: 'Es necesario subir los documentos de Identificación, Comprobante de domicilio y Comprobante de estado de cuenta para hacer el upgrade de este cuenta' })
      }
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

  deleteTimeUser = async (req, res, next) => {
    try {
      const timeMonth = Date.now() - (2629746000 * 2)
      const mail1 = await userModel.find({ last_connection: { $lte: timeMonth } })
      const html = '<div><h1> Se ha eliminado tu cuenta</h1> <p> Debido a la inactivadad de la cuenta tu usuario se ha eliminado por los procesos de limpieza de la plataforma</p> <blockquote> Es un proceso que opta por mejorar el funcionamiento de nuestra plataforma </blockquote> <p> Cuando quieras puedes volver a abrir una cuenta en nuestra web. Esperamos verte de nuevo pronto. </p> </div>'
      await mail1.forEach(user => {
        sendMail(user.email, 'Tu usuario excedio el tiempo de inactividad', html)
      })
      const quitar = await userModel.deleteMany({ last_connection: { $lte: timeMonth } })
      // const quitar = await userModel.deleteMany({ last_connection: { $exists: false } })
      res.status(200).send({
        status: 'success',
        deletes: quitar,
        payload: mail1
      })
    } catch (error) {
      next(error)
    }
  }
}

module.exports = new UserController()
