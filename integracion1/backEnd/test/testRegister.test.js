const chai = require('chai')
const supertest = require('supertest')

const expect = chai.expect
const requester = supertest('http://localhost:8080')

describe('Testing de app', () => {
  it('El servicio debe registrar un usuario correctamente', async (done) => {
    const userMock = {
      nickname: 'LaPulgaaa',
      first_name: 'Pedro',
      last_name: 'Pascal',
      age: 48,
      email: 'pedrito0105@gmail.com', // Cambiar en cada intento
      password: 'pedrito123'
    }
    const result = await requester.post('/passport/register').send(userMock)
    // console.log(result)
    // expect(result._data).to.be.ok
    expect(response.statusCode).to.equal(200)
    done()
  }).timeout(10000)

  it('Logout para borrar la cookie del register', async () => {
    const result = await requester.get('/views/logout')
  })
})
