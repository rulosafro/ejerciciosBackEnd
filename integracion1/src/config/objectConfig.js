const { connect } = require("mongoose")
const dotenv = require("dotenv")
const { commander } = require("./commander")
const { mode } = commander.opts()

dotenv.config({
  path: mode === "development" ? "./.env.development" : "./.env.production",
})

module.exports = {
  persistence: process.env.PERSISTENCE,
  port: process.env.PORT,
  jwt_secret_key: process.env.SECRET_KEY,

  connectDB: async () => {
    try {
      connect(process.env.MONGO_URL)
      console.log("Base de datos conectadas")
    } catch (err) {
      console.log(err)
    }
  },
}
