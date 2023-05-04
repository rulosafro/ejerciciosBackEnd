const { Schema, model } = require("mongoose")

const collection = "users"

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
    index: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  nickname: String,
  gender: String,
})

const userModel = model(collection, productSchema)

module.exports = {
  userModel,
}
