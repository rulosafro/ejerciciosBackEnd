const { Router } = require('express')
const router = Router()
const nodemailer = require('nodemailer')
const config = require('../../config/objectConfig')
const { sendMail } = require('../../utils/sendmail')
const { sendSMS } = require('../../utils/sendSMS')
const { generateUser } = require('../../utils/generateUsers')
const { faker } = require('@faker-js/faker')

const nombres = ['javi', 'isi']

router.get('/testuser', (req, res) => {
  const persona = {
    first_name: faker.person.first_name(),
    last_name: faker.person.last_name(),
    email: faker.internet.email(),
    password: faker.internet.password()
  }
  res.send({
    status: 'success',
    payload: persona
  })
})

router.get('/simple', (req, res) => {
  let suma = 0
  for (let i = 0; i < 10000000; i++) {
    suma += i
  }
  res.send({ status: 'success', message: `El worker ${process.id} a atendido esat petición, el resultado es ${suma}` })
})
router.get('/complejo', (req, res) => {
  let suma = 0
  for (let i = 0; i < 5e8; i++) {
    suma += i
  }
  res.send({ status: 'success', message: `El worker ${process.id} a atendido esat petición, el resultado es ${suma}` })
})

router.get('/logger', async (req, res) => {
  // req.logger.warn('alerta')
  req.logger.info('info')
  req.logger.warning('warning')
  req.logger.error('error')
  res.send({ message: 'Prueba Logger' })
})

router.get('/string muy largo', async (req, res) => {

})

router.param('nombre', async (req, res, next, nombre) => {
  if (!nombres.includes(nombre)) {
    req.nombre = null
    res.send('No existe el nombre papito')
  } else {
    req.nombre = nombre
  }
  next()
})

router.get('/params/:nombre([a-zA-Z]+)', (req, res) => {
  res.send({ message: 'lo lograste crack', nombre: req.params.nombre })
})

const transport = nodemailer.createTransport({
  service: 'gmail',
  port: 587,
  auth: {
    user: config.gmail_user_app,
    pass: config.gmail_pass_app
  }
})

router.get('/sms', async (req, res) => {
  await sendSMS()
  res.send({ message: 'Email enviado' })
})

router.get('/mail', async (req, res) => {
  await sendMail('rulosafro@gmail.com', 'Correo de prueba 2', '<div><h1> Este es un test </h1></div>')
  res.send({ message: 'Email enviado' })
})

router.get('/mocks', async (req, res) => {
  const users = []
  for (let i = 0; i < 100; i++) {
    users.push(generateUser())
  }
  res.send({
    status: 'success',
    payload: users
  })
})

module.exports = router
