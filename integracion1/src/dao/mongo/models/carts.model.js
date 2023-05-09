const { Schema, model } = require("mongoose")

const collection = "carts"

const cartSchema = new Schema({
  products: [
    {
      product: {
        type: Schema.Types.ObjectId,
        ref: "productos",
      },
      quantity: Number,
    },
  ],
})

cartSchema.pre("findOne", function () {
  this.populate("products.product")
})

const cartsModel = model(collection, cartSchema)

module.exports = {
  cartsModel,
}
