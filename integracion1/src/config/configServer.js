const dotenv = require("dotenv")
dotenv.config()

const { connect } = require("mongoose")

module.exports = {
  connectDB: async () => {
    try {
      connect(process.env.MONGO_URL)
      console.log("BBDD Connected via MongoDB")
    } catch (error) {
      console.log(error)
    }
  },
}
