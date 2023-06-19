const ContactRepository = require("../repositories/contacts.repository")
const { UserDao, ProductDao, CartDao, MessagesDao, ContactDao } = require("../Daos/factory")

// Traer los repositories

const userService = new UserDao()
const productService = new ProductDao()
const cartService = new CartDao()
const messageService = new MessagesDao()
const contactService = new ContactRepository(new ContactDao())

module.exports = {
  userService,
  productService,
  cartService,
  messageService,
  contactService,
}
