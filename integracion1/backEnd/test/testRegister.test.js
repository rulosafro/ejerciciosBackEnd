const chai = require('chai')
const supertest = require('supertest')

const expect = chai.expect
const requester = supertest('http://localhost:8080')

describe('Testing de app', () => {
  it('Logout para borrar la cookie del register', async () => {
    const result = await requester.get('/views/logout')
  })

  it('El servicio debe registrar un usuario correctamente', async () => {
    const userMock = {
      nickname: 'LaPulgaaa',
      first_name: 'Pedro',
      last_name: 'Pascal',
      age: 48,
      email: 'pedrito0111@gmail.com', // Cambiar en cada intento
      password: 'pedrito123'
    }
    const response = await requester.post('/passport/swagger/register').send(userMock)
    expect(response.statusCode).to.equal(200)
  }).timeout(9000)
})
