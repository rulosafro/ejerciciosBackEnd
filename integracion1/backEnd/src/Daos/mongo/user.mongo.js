const { userModel } = require("./models/user.model")

class UserManagerMongo {
  async get() {
    try {
      return await userModel.find({}).lean()
    } catch (error) {
      console.error(error)
    }
  }

  async getByID(uid) {
    try {
      return await userModel.findOne({ _id: uid })
    } catch (error) {
      console.error(error)
    }
  }

  async add(newUser) {
    try {
      return await userModel.create(newUser)
    } catch (error) {
      console.error(error)
    }
  }

  async update(uid, cambio) {
    try {
      return await userModel.updateOne({ _id: uid }, cambio)
    } catch (error) {
      console.log(error)
    }
  }

  async delete(uid) {
    try {
      return userModel.deleteOne({ _id: uid })
    } catch (error) {
      console.log(error)
    }
  }
}

module.exports = UserManagerMongo
