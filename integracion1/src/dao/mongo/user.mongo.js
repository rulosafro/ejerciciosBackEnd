const { userModel } = require("./models/user.model")

class UserManagerMongo {
  async getUsers() {
    try {
      return await userModel.find({}).lean()
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

  async addUser(newUser) {
    try {
      return await userModel.create(newUser)
    } catch (error) {
      return console.error(error)
    }
  }

  async updateUser(uid, cambio) {
    try {
      return await userModel.updateOne({ _id: uid }, cambio)
    } catch (error) {
      console.log(error)
    }
  }

  async deleteUser(uid) {
    try {
      return userModel.deleteOne({ _id: uid })
    } catch (error) {
      console.log(error)
    }
  }
}

module.exports = new UserManagerMongo()
