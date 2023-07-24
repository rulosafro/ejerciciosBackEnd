const ContactDto = require('../Dto/contact.dto')

class ContactRepository {
  constructor (dao) {
    this.dao = dao
  }

  getContacts = async () => {
    const result = await this.dao.get()
    return result
  }

  createContact = async (newContact) => {
    const contactToInsert = new ContactDto(newContact)
    const result = await this.dao.create(contactToInsert)
    return result
  }
}

module.exports = ContactRepository
