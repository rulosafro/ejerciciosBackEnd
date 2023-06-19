const config = require("../config/objectConfig.js")

let ProductDao
let UserDao
let ContactDao
let MessagesDao
let CartDao

switch (config.persistence) {
  case "MONGO":
    config.connectDB()
    const ProductDaoMongo = require("../Daos/mongo/product.mongo.js")
    const UserDaoMongo = require("../Daos/mongo/user.mongo.js")
    const CartDaoMongo = require("../Daos/mongo/carts.mongo.js")
    const MessagesDaoMongo = require("../Daos/mongo/messages.mongo.js")
    const ContactDaoMongo = require("../Daos/mongo/contacts.mongo.js")

    ProductDao = ProductDaoMongo
    UserDao = UserDaoMongo
    MessagesDao = MessagesDaoMongo
    CartDao = CartDaoMongo
    ContactDao = ContactDaoMongo
    break

  case "FILE":
    const ProductDaoFile = require("../Daos/otros/file[fs]/ProductManager3.js")
    // const UserDaoFile = require("../Daos/otros/file[fs]/")

    ProductDao = ProductDaoFile
    // UserDao = UserDUserDaoFileaoMongo
    break

  case "MEMORY":
    const ProductDaoMemory = require("../Daos/otros/memory[json]/product.memory.js")
    // const UserDaoMemory = require("../Daos/")

    ProductDao = ProductDaoMemory
    // UserDao = UserDaoUserDaoMemoryMongo
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
}
