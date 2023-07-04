const { messageService } = require("../service/index.service")

class MessageController {
  getMessage = async (req, res) => {
    try {
      const messages = await messageService.get()
      // res.status(200).send({
      //   status: "success",
      //   payload: messages,
      // })
      res.render("chat", { titutlo1: "hola" })
    } catch (error) {
      console.log(error)
    }
  }

  getMessageById = async (req, res) => {
    try {
      const { mid } = req.params
      let message = await messageService.getByID(mid)
      res.status(200).send({
        status: "success",
        payload: message,
      })
    } catch (error) {
      console.log(error)
    }
  }

  createMessage = async (req, res) => {
    try {
      const newMessage = req.body
      let result = await messageService.add(newMessage)
      res.status(200).send({
        status: "success",
        payload: result,
      })
    } catch (error) {
      console.log(error)
    }
  }

  updateMessage = async (req, res) => {
    try {
      const { mid } = req.params
      const cambio = req.body
      const modificado = await messageService.update(mid, cambio)
      res.status(200).send({
        status: "success",
        payload: modificado,
      })
    } catch (error) {
      console.log(error)
    }
  }

  deleteMessage = async (req, res) => {
    try {
      const { mid } = req.params
      const quitar = await messageService.delete(mid)
      res.status(200).send({
        status: "success",
        payload: quitar,
      })
    } catch (error) {
      console.log(error)
    }
  }
}

module.exports = new MessageController()
