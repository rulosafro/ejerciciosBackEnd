const { Schema, model } = require('mongoose')
const moongoosePaginate = require('mongoose-paginate-v2')

const collection = 'users'

const userSchema = new Schema({
  nickname: String,
  first_name: {
    type: String,
    // required: true,
    index: true
  },
  last_name: {
    type: String
    // required: true,
  },
  email: {
    type: String,
    // required: true,
    index: true
  },
  age: Number,
  password: String,
  role: String,
  cart: String,
  owner: {
    type: String,
    default: 'admin'
  }
  // gender: String,
})

userSchema.plugin(moongoosePaginate)
const userModel = model(collection, userSchema)

module.exports = {
  userModel
}
