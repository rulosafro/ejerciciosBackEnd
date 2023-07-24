const { connect } = require('mongoose')
const dotenv = require('dotenv')
const { commander } = require('./commander')
const { mode } = commander.opts()
const { logger } = require('./logger')
const MongoSingleton = require('./singleton')

dotenv.config({
  path: mode === 'development' ? './.env.development' : './.env.production'
})

module.exports = {
  persistence: process.env.PERSISTENCE,
  port: process.env.PORT,
  jwt_secret_key: process.env.SECRET_KEY,
  gmail_user_app: process.env.GMAIL_USER_APP,
  gmail_pass_app: process.env.GMAIL_PASS_APP,
  twilio_sid: process.env.TWILIO_SID,
  twilio_auth_token: process.env.TWILIO_AUTH_TOKEN,
  twilio_phone_number: process.env.TWILIO_PHONE_NUMBER,

  connectDB: async () => await MongoSingleton.getInstances()
}
