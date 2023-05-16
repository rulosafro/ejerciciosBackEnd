const { connect } = require("mongoose")
const url = "mongodb+srv://rama:rama123@ecommerce.omzog5n.mongodb.net/ecommerce?retryWrites=true&w=majority"

module.exports = {
  connectDB: async () => {
    try {
      connect(url)
      console.log("BBDD Connected via MongoDB")
    } catch (error) {
      console.log(error)
    }
  },
}
