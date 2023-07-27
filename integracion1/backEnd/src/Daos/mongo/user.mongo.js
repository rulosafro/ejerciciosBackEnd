const { logger } = require('../../config/logger')
const { userModel } = require('./models/user.model')

class UserManagerMongo {
  constructor () {
    this.userModel = userModel
  }

  async get () {
    try {
      return await userModel.find({}).lean()
    } catch (error) {
      logger.error(error)
    }
  }

  async getByID (uid) {
    try {
      return await userModel.findOne({ _id: uid })
    } catch (error) {
      logger.error(error)
    }
  }

  async getByMail (mail) {
    try {
      return await userModel.findOne({ email: mail })
    } catch (error) {
      logger.error(error)
    }
  }

  async add (newUser) {
    try {
      return await userModel.create(newUser)
    } catch (error) {
      logger.error(error)
    }
  }

  async update (uid, cambio) {
    try {
      return await userModel.updateOne({ _id: uid }, cambio)
    } catch (error) {
      logger.error(error)
    }
  }

  async delete (uid) {
    try {
      return userModel.deleteOne({ _id: uid })
    } catch (error) {
      logger.error(error)
    }
  }
}

module.exports = UserManagerMongo
