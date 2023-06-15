const UserManagerMongo = require("../Daos/mongo/user.mongo")
const ProductManagerMongo = require("../Daos/mongo/product.mongo")
const CartManagerMongo = require("../Daos/mongo/carts.mongo")
const MessageManagerMongo = require("../Daos/mongo/messages.mongo")

// traer instancias de los daos
// Traer los repositories

const userService = new UserManagerMongo()
const productService = new ProductManagerMongo()
const cartService = new CartManagerMongo()
const messageService = new MessageManagerMongo()

module.exports = {
  userService,
  productService,
  cartService,
  messageService,
}
