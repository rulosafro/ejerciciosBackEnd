const { messagesModel } = require("./models/messages.model")

class MessagesManagerMongo {
  async get() {
    try {
      return await messagesModel.find({})
    } catch (error) {
      return new Error(error)
    }
  }

  async getByID(mid) {
    try {
      return await messagesModel.findOne({ _id: mid })
    } catch (error) {
      console.error(error)
    }
  }

  async add(newMessage) {
    try {
      return await messagesModel.create(newMessage)
    } catch (error) {
      return console.error(error)
    }
  }

  async update(mid, cambio) {
    try {
      return await messagesModel.updateOne({ _id: mid }, cambio)
    } catch (error) {
      console.log(error)
    }
  }

  async delete(mid) {
    try {
      return messagesModel.deleteOne({ _id: mid })
    } catch (error) {
      console.log(error)
    }
  }
}

module.exports = MessagesManagerMongo
