const { Schema, model } = require("mongoose")

const collection = "carts"

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

const cartsModel = model(collection, productSchema)

module.exports = {
  cartsModel,
}
