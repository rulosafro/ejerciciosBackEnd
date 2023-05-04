const { userModel } = require("./models/user.model")

class UserManagerMongo {
  async getUsers() {
    try {
      return await userModel.find({})
    } catch (error) {
      return new Error(error)
    }
  }
  async getUsersByID(uid) {
    try {
      return await userModel.findOne({ _id: uid })
    } catch (error) {
      console.error(error)
    }
  }
  async addUser() {
    try {
      return await userModel.create(newProduct)
    } catch (error) {
      return console.error(error + "El error esta acá")
      // console.log("Prueba 11")
    }
  }
  async upadteUser(uid) {}
  async deleteUser(uid) {}
}

module.exports = new UserManagerMongo()
