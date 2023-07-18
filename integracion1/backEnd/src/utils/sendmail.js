const nodemailer = require('nodemailer')
const config = require('../config/objectConfig')

const transport = nodemailer.createTransport({
  service: 'gmail',
  port: 587,
  auth: {
    user: config.gmail_user_app,
    pass: config.gmail_pass_app
  }
})

exports.sendMail = async (destino, subject, html) => {
  return await transport.sendMail({
    from: 'Coder Test <rulosafro@gmail.com>',
    to: destino,
    // to: 'rulosafro@gmail.com',
    subject,
    // subject: 'Correo de prueba Coder' ,
    html,
    // html: `<div><h1> Este es un test </h1></div>`,
    attachments: [{
    //   filename: 'node.png',
    //   path: __dirname + '/node.png',
    //   cid: 'nodeImage'
    }]
  })
}
