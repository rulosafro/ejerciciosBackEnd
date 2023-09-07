const { ObjectId } = require('mongodb')
const { model, Schema } = require('mongoose')

const collection = 'tickets'
const ticketSchema = new Schema({
  code: {
    type: String,
    unique: true,
    required: true,
    default: new ObjectId()
  },
  purchase_datetime: {
    type: Date,
    default: Date.now,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  purchaser: {
    type: String,
    required: true
  },
  cartID: {
    type: String
  },
  productComprado: [],
  productNoComprado: []
})

const ticketModel = model(collection, ticketSchema)

module.exports = {
  ticketModel
}
