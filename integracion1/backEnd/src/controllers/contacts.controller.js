const { contactService } = require('../service/index.service')

class ContactsController {
  getContacts = async (req, res, next) => {
    try {
      res.render('chat', {
        status: 'success',
        payload: 'contactos get'
      })
    } catch (error) {
      next(error)
    }
  }

  createContacts = async (req, res, next) => {
    try {
      const { name, last_name, phone } = req.body
      const result = await contactService.createContact({ name, last_name, phone })
      res.send({
        status: 'success',
        payload: result
      })
    } catch (error) {
      next(error)
    }
  }

  // getOrdersById = async () => {}
  // updateOrders = async () => {}
  // deleteOrders = async () => {}
}

module.exports = new ContactsController()
