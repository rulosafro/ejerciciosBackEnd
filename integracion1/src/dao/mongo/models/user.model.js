const { Schema, model } = require("mongoose")

const collection = "users"

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  Email: {
    type: String,
    required: true,
  },
  nickname: String,
})

const userModel = model(collection, productSchema)

module.exports = {
  userModel,
}
