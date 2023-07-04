const { contactsModel } = require("./models/contacts.model")

class ContactDaoMongo {
  constructor() {
    this.contactsModel = contactsModel
  }

  get = async () => this.contactsModel.find({})
  create = async (newContact) => this.contactsModel.create(newContact)
}

module.exports = ContactDaoMongo
