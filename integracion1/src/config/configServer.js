const { connect } = require("mongoose")
const url = "mongodb://127.0.0.1:27017/ecommerce"

module.exports = {
  connectDB: () => {
    connect("mongodb://127.0.0.1:27017/ecommerce")
    console.log("BBDD Connected via MongoDB")
  },
}
