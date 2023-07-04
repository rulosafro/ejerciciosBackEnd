const ContactRepository = require("../repositories/contacts.repository")
const { UserDao, ProductDao, CartDao, MessagesDao, ContactDao, TicketDao } = require("../Daos/factory")
const ProductRepository = require("../repositories/products.repository")

// Traer los repositories

const userService = new UserDao()
const productService = new ProductDao()
const cartService = new CartDao()
const messageService = new MessagesDao()
const contactService = new ContactRepository(new ContactDao())
const ticketService = new TicketDao()

module.exports = {
  userService,
  productService,
  cartService,
  messageService,
  contactService,
  ticketService
}
