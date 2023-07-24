const { logger } = require('../config/logger')
const { messageService } = require('../service/index.service')

class MessageController {
  getMessage = async (req, res, next) => {
    try {
      const messages = await messageService.get()
      // res.status(200).send({
      //   status: "success",
      //   payload: messages,
      // })
      res.render('chat', { titutlo1: 'hola' })
    } catch (error) {
      next(error)
    }
  }

  getMessageById = async (req, res) => {
    try {
      const { mid } = req.params
      const message = await messageService.getByID(mid)
      res.status(200).send({
        status: 'success',
        payload: message
      })
    } catch (error) {
      logger.error(error)
    }
  }

  createMessage = async (req, res, next) => {
    try {
      const newMessage = req.body
      const result = await messageService.add(newMessage)
      res.status(200).send({
        status: 'success',
        payload: result
      })
    } catch (error) {
      next(error)
    }
  }

  updateMessage = async (req, res, next) => {
    try {
      const { mid } = req.params
      const cambio = req.body
      const modificado = await messageService.update(mid, cambio)
      res.status(200).send({
        status: 'success',
        payload: modificado
      })
    } catch (error) {
      next(error)
    }
  }

  deleteMessage = async (req, res, next) => {
    try {
      const { mid } = req.params
      const quitar = await messageService.delete(mid)
      res.status(200).send({
        status: 'success',
        payload: quitar
      })
    } catch (error) {
      next(error)
    }
  }
}

module.exports = new MessageController()
