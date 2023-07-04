const { ticketModel } = require('./models/ticket.model')


class TicketManagerMongo { 
    constructor() {
    //  iniciar la base de datos
    this.ticketModel = ticketModel
  }
  async get() {
    try {
      return await ticketModel.find({}).lean()
    } catch (error) {
      console.log(error)
    }
  }

  async getById(tid) {
    try {
      return await ticketModel.find({_id: tid})
    } catch (error) {
      console.log(error)
    }
  }

  async getByCode(tid) {
    try {
      return await ticketModel.find({code: tid})
    } catch (error) {
      console.log(error)
    }
  }

  async update(tid, cambio) {
    try {
      return await ticketModel.updateOne({ _id: tid }, cambio)
    } catch (error) {
      console.log(error)
    }
  }

  async create(obj) {
    try {
      return await ticketModel.create(obj)
    } catch (error) {
      console.log(error)
    }
  }

  async delete(tid) {
    try {
      return ticketModel.deleteOne({ _id: tid })
    } catch (error) {
      console.log(error)
    }
  }
}
module.exports = TicketManagerMongo