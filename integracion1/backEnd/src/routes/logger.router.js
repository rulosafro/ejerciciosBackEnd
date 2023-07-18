const { Router } = require('express')
const router = Router()
const { faker } = require('@faker-js/faker')

router.get('/', async (req, res) => {
  req.logger.debug('debug')
  req.logger.http('http')
  req.logger.info('info')
  req.logger.warning('warning')
  req.logger.error('error')
  req.logger.fatal('fatal')
  res.send({ message: 'Prueba Logger' })
})

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

module.exports = router
