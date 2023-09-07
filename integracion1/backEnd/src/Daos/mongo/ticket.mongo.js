const { logger } = require('../../config/logger')
const { ticketModel } = require('./models/ticket.model')

class TicketManagerMongo {
  constructor () {
    //  iniciar la base de datos
    this.ticketModel = ticketModel
  }

  async get () {
    try {
      return await ticketModel.find({}).lean()
    } catch (error) {
      logger.error(error)
    }
  }

  async getById (tid) {
    try {
      return await ticketModel.find({ _id: tid }).lean()
    } catch (error) {
      logger.error(error)
    }
  }

  async getByCid (tid) {
    try {
      return await ticketModel.find({ cartID: tid }).sort({ purchase_datetime: -1 }).lean()
    } catch (error) {
      logger.error(error)
    }
  }

  async getByCode (tid) {
    try {
      return await ticketModel.find({ code: tid }).lean()
    } catch (error) {
      logger.error(error)
    }
  }

  async update (tid, cambio) {
    try {
      return await ticketModel.updateOne({ _id: tid }, cambio)
    } catch (error) {
      logger.error(error)
    }
  }

  async create (obj) {
    try {
      return await ticketModel.create(obj)
    } catch (error) {
      logger.error(error)
    }
  }

  async delete (tid) {
    try {
      return ticketModel.deleteOne({ _id: tid })
    } catch (error) {
      logger.error(error)
    }
  }
}
module.exports = TicketManagerMongo
