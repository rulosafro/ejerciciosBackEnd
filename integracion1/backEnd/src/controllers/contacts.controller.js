const { contactService } = require("../service/index.service")

class ContactsController {
  getContacts = async (req, res) => {
    res.render("chat", {
      status: "success",
      payload: "contactos get",
    })
  }

  createContacts = async (req, res) => {
    let { name, last_name, phone } = req.body
    let result = await contactService.createContact({ name, last_name, phone })
    res.send({
      status: "success",
      payload: result,
    })
  }

  // getOrdersById = async () => {}
  // updateOrders = async () => {}
  // deleteOrders = async () => {}
}

module.exports = new ContactsController()
