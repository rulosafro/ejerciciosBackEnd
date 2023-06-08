const { Schema, model } = require("mongoose")
const moongoosePaginate = require("mongoose-paginate-v2")

const collection = "users"

const userSchema = new Schema({
  username: String,
  first_name: {
    type: String,
    // required: true,
    index: true,
  },
  last_name: {
    type: String,
    // required: true,
  },
  email: {
    type: String,
    required: true,
    index: true,
  },
  age: Number,
  password: String,
  role: String,
  cart: String,
  // gender: String,
})

userSchema.plugin(moongoosePaginate)
const userModel = model(collection, userSchema)

module.exports = {
  userModel,
}
