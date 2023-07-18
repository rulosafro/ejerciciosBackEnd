const dotenv = require('dotenv')
dotenv.config()

const { connect } = require('mongoose')
const { logger } = require('../logger')

module.exports = {
  connectDB: async () => {
    try {
      connect(process.env.MONGO_URL)
      logger.info('BBDD Connected via MongoDB')
    } catch (error) {
      logger.error(error)
    }
  }
}
