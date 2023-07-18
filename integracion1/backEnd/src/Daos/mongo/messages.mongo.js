const { logger } = require('../../config/logger')
const { messagesModel } = require('./models/messages.model')

class MessagesManagerMongo {
  async get () {
    try {
      return await messagesModel.find({})
    } catch (error) {
      return new Error(error)
    }
  }

  async getByID (mid) {
    try {
      return await messagesModel.findOne({ _id: mid })
    } catch (error) {
      logger.error(error)
    }
  }

  async add (newMessage) {
    try {
      return await messagesModel.create(newMessage)
    } catch (error) {
      return logger.error(error)
    }
  }

  async update (mid, cambio) {
    try {
      return await messagesModel.updateOne({ _id: mid }, cambio)
    } catch (error) {
      logger.error(error)
    }
  }

  async delete (mid) {
    try {
      return messagesModel.deleteOne({ _id: mid })
    } catch (error) {
      logger.error(error)
    }
  }
}

module.exports = MessagesManagerMongo
