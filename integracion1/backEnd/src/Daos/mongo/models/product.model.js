const { Schema, model } = require("mongoose")
const moongoosePaginate = require("mongoose-paginate-v2")

const collection = "products"

const productSchema = new Schema({
  title: {
    type: String,
    required: true,
    index: true,
  },
  description: String,
  thumbnail: String,
  price: Number,
  stock: Number,
  code: {
    type: String,
    unique: true,
    required: true,
  },
})

productSchema.plugin(moongoosePaginate)
const productModel = model(collection, productSchema)

module.exports = {
  productModel,
}
