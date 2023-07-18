const { logger } = require('../config/logger')
const { messageService } = require('../service/index.service')

class MessageController {
  getMessage = async (req, res) => {
    try {
      const messages = await messageService.get()
      // res.status(200).send({
      //   status: "success",
      //   payload: messages,
      // })
      res.render('chat', { titutlo1: 'hola' })
    } catch (error) {
      logger.error(error)
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

  createMessage = async (req, res) => {
    try {
      const newMessage = req.body
      const result = await messageService.add(newMessage)
      res.status(200).send({
        status: 'success',
        payload: result
      })
    } catch (error) {
      logger.error(error)
    }
  }

  updateMessage = async (req, res) => {
    try {
      const { mid } = req.params
      const cambio = req.body
      const modificado = await messageService.update(mid, cambio)
      res.status(200).send({
        status: 'success',
        payload: modificado
      })
    } catch (error) {
      logger.error(error)
    }
  }

  deleteMessage = async (req, res) => {
    try {
      const { mid } = req.params
      const quitar = await messageService.delete(mid)
      res.status(200).send({
        status: 'success',
        payload: quitar
      })
    } catch (error) {
      logger.error(error)
    }
  }
}

module.exports = new MessageController()
