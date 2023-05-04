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
      return console.error(error)
    }
  }

  async updateMessages(mid, cambio) {
    try {
      return await messagesModel.updateOne({ _id: mid }, cambio)
    } catch (error) {
      console.log(error)
    }
  }

  async deleteMessages(mid) {
    try {
      return messagesModel.deleteOne({ _id: mid })
    } catch (error) {
      console.log(error)
    }
  }
}

module.exports = new MessagesManagerMongo()
