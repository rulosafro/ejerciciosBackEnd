const ContactDto = require("../Dto/contact.dto")

class ContactRepository {
  constructor(dao) {
    this.dao = dao
  }
  getContacts = async () => {
    let result = await this.dao.get()
    return result
  }

  createContact = async (newContact) => {
    let contactToInsert = new ContactDto(newContact)
    let result = await this.dao.create(contactToInsert)
    return result
  }
}

module.exports = ContactRepository
