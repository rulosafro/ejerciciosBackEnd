const config = require('../config/objectConfig.js')

let ProductDao
let UserDao
let ContactDao
let MessagesDao
let CartDao
let TicketDao

switch (config.persistence) {
  case 'MONGO':
    config.connectDB()
    const ProductDaoMongo = require('../Daos/mongo/product.mongo.js')
    const UserDaoMongo = require('../Daos/mongo/user.mongo.js')
    const CartDaoMongo = require('../Daos/mongo/carts.mongo.js')
    const MessagesDaoMongo = require('../Daos/mongo/messages.mongo.js')
    const ContactDaoMongo = require('../Daos/mongo/contacts.mongo.js')
    const TicketDaoMongo = require('../Daos/mongo/ticket.mongo.js')

    ProductDao = ProductDaoMongo
    UserDao = UserDaoMongo
    MessagesDao = MessagesDaoMongo
    CartDao = CartDaoMongo
    ContactDao = ContactDaoMongo
    TicketDao = TicketDaoMongo
    break

  case 'FILE':
    config.connectDB()
    // const ProductDaoFile = require('..ß/Daos/otros/file[fs]/ProductManager3.js')
    // ProductDao = ProductDaoFile

    const ProductDaoMongo2 = require('../Daos/mongo/product.mongo.js')
    const UserDaoMongo2 = require('../Daos/mongo/user.mongo.js')
    const CartDaoMongo2 = require('../Daos/mongo/carts.mongo.js')
    const MessagesDaoMongo2 = require('../Daos/mongo/messages.mongo.js')
    const ContactDaoMongo2 = require('../Daos/mongo/contacts.mongo.js')
    const TicketDaoMongo2 = require('../Daos/mongo/ticket.mongo.js')
    ProductDao = ProductDaoMongo2
    UserDao = UserDaoMongo2
    MessagesDao = MessagesDaoMongo2
    CartDao = CartDaoMongo2
    ContactDao = ContactDaoMongo2
    TicketDao = TicketDaoMongo2
    break

  case 'MEMORY':
    config.connectDB()
    const ProductDaoMemory = require('../Daos/otros/memory[json]/product.memory.js')
    ProductDao = ProductDaoMemory

    // ProductDao = ProductDaoMongo
    UserDao = UserDaoMongo
    MessagesDao = MessagesDaoMongo
    CartDao = CartDaoMongo
    ContactDao = ContactDaoMongo
    TicketDao = TicketDaoMongo
    break

  default:
    break
}

module.exports = {
  UserDao,
  ProductDao,
  ContactDao,
  MessagesDao,
  CartDao,
  TicketDao
}
