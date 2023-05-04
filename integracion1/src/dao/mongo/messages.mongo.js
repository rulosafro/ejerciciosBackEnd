const { messagesModel } = require("./models/messages.model")

class MessagesManagerMongo {
  async getMessages() {
    try {
      return await messagesModel.find({})
    } catch (error) {
      return new Error(error)
    }
  }

  async getMessageByID(mid) {
    try {
      return await messagesModel.findOne({ _id: mid })
    } catch (error) {
      console.error(error)
    }
  }

  async addMessages(newMessage) {
    try {
      return await messagesModel.create(newMessage)
    } catch (error) {
      return console.error(error + "El error esta acá")
      // console.log("Prueba 11")
    }
  }

  async upadteMessages(mid) {}

  async deleteMessages(mid) {}
}

module.exports = new MessagesManagerMongo()
