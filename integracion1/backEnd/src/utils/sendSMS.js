const { twilio_sid, twilio_auth_token, twilio_phone_number } = require('../config/objectConfig')
const twilio = require('twilio')

const cliente = twilio(twilio_sid, twilio_auth_token)

exports.sendSMS = () => cliente.messages.create({
  body: 'Mensaje de prueba',
  from: twilio_phone_number,
  to: '+56953416318'

})
