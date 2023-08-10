const { Schema, model } = require('mongoose')

const collection = 'messages'

const productSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  Email: {
    type: String,
    required: true
  },
  nickname: String
})

const messagesModel = model(collection, productSchema)

module.exports = {
  messagesModel
}
