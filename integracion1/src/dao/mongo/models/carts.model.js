const { Schema, model } = require("mongoose")

const collection = "carts"

const cartSchema = new Schema({
  products: [
    {
      product: {
        type: Schema.Types.ObjectId,
        ref: "productos",
      },
    },
  ],
})

const cartsModel = model(collection, cartSchema)

module.exports = {
  cartsModel,
}
