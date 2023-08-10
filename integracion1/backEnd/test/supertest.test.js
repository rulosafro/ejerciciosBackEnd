const chai = require('chai')
const supertest = require('supertest')
const jwt = require('jsonwebtoken')

const expect = chai.expect
const requester = supertest('http://localhost:8080')

describe('Testing de app', () => {
  // TODO USER ---------------------------------------------------------------
  describe('Testing de JWT admin + /api/users', () => {
    let cookie
    it('Logout para borrar la cookie del register', async () => {
      const result = await requester.get('/views/logout')
    })

    it('El servicio debe loguear un usuario correctamente y devolver una cookie para jwt', async () => {
      const userMock = {
        email: 'javi@a.com',
        password: 'javi1234'
      }

      const result = await requester.post('/passport/login').send(userMock)
      const cookieResult = result.headers['set-cookie'][0]
      expect(cookieResult).to.be.ok
      cookie = {
        name: cookieResult.split('=')[0],
        value: cookieResult.split('=')[1]
      }

      expect(cookie.name).to.be.ok.and.eql('coderCookieToken')
      expect(cookie.value).to.be.ok
    }).timeout(3000)

    it('Prueba de validación de JWT', async () => {
      const result = await requester.get('/api/carts').set('Cookie', [`${cookie.name}=${cookie.value}`])
      // await expect(result._body.payload.user.email).to.be.equal(userMock.email)
      expect(result.statusCode).to.equal(200)
    })

    it('El endpoint de GET /api/users debe mostrar todos los usuarios correctamente', async () => {
      const { statusCode, _body, ok } = await requester.get('/api/users').set('Cookie', [`${cookie.name}=${cookie.value}`])
      expect(ok).to.be.equal(true)
      expect(statusCode).to.be.equal(200)
    })

    it('El endpoint de POST /api/users debe crear un usuario correctamente', async () => {
      const userMock = {
        nickname: 'LaPulgaaa',
        first_name: 'Pedro',
        last_name: 'Pascal',
        age: 48,
        email: 'pedrito2@a.com',
        password: 'pedrito123',
        role: 'user'
      }

      const response = await requester.post('/api/users').send(userMock).set('Cookie', [`${cookie.name}=${cookie.value}`])
      expect(response.statusCode).to.equal(200)
      expect(response.body).to.have.property('payload')
      expect(response.body.payload).to.have.property('_id')
      userId = response.body.payload._id
    })

    it('El endpoint de GET /api/users by ID', async () => {
      const response = await requester.get(`/api/users/${userId}`).set('Cookie', [`${cookie.name}=${cookie.value}`])
      expect(response.statusCode).to.equal(200)
      expect(response.body.payload).to.have.property('_id')
      expect(response.body.payload._id).to.equal(userId)
    })

    it('El endpoint PUT /api/users/:id debe actualizar un user correctamente', async () => {
      const updatedUser = {
        first_name: 'DonPedro'
      }
      const response = await requester.put(`/api/users/${userId}`).send(updatedUser).set('Cookie', [`${cookie.name}=${cookie.value}`])
      expect(response.statusCode).to.equal(200)
      expect(response.body).to.have.property('payload')
      expect(response.body.payload.acknowledged).to.equal(true)
      expect(response.body.payload.modifiedCount).to.equal(1)
    })

    it('El endpoint DELETE /api/users/:id debe eliminar una mascota correctamente', async () => {
      const response = await requester.delete(`/api/users/${userId}`).set('Cookie', [`${cookie.name}=${cookie.value}`])

      expect(response.statusCode).to.equal(200)
      expect(response.body).to.have.property('payload')
      expect(response.body.payload.acknowledged).to.equal(true)
      expect(response.body.payload.deletedCount).to.equal(1)
    })
  })

  // TODO CARTS ---------------------------------------------------------------
  describe('Testing de JWT admin + /api/carts', () => {
    let cookie
    it('Logout para borrar la cookie del register', async () => {
      const result = await requester.get('/views/logout')
    })

    it('El servicio debe loguear un usuario correctamente y devolver una cookie para jwt', async () => {
      const userMock = {
        email: 'javi@a.com',
        password: 'javi1234'
      }

      const result = await requester.post('/passport/login').send(userMock)
      const cookieResult = result.headers['set-cookie'][0]
      expect(cookieResult).to.be.ok
      cookie = {
        name: cookieResult.split('=')[0],
        value: cookieResult.split('=')[1]
      }

      expect(cookie.name).to.be.ok.and.eql('coderCookieToken')
      expect(cookie.value).to.be.ok
    }).timeout(3000)

    it('El endpoint de GET /api/cart debe mostrar todos los carritos correctamente', async () => {
      const { statusCode, _body, ok } = await requester.get('/api/carts').set('Cookie', [`${cookie.name}=${cookie.value}`])
      expect(ok).to.be.equal(true)
      expect(statusCode).to.be.equal(200)
    })

    // it('El endpoint de POST /api/users debe crear un usuario correctamente', async () => {
    //   const userMock = {
    //     nickname: 'LaPulgaaa',
    //     first_name: 'Pedro',
    //     last_name: 'Pascal',
    //     age: 48,
    //     email: 'pedrito2@a.com',
    //     password: 'pedrito123',
    //     role: 'user'
    //   }

    //   const response = await requester.post('/api/users').send(userMock).set('Cookie', [`${cookie.name}=${cookie.value}`])
    //   expect(response.statusCode).to.equal(200)
    //   expect(response.body).to.have.property('payload')
    //   expect(response.body.payload).to.have.property('_id')
    //   userId = response.body.payload._id
    // })

    // it('El endpoint de GET /api/users by ID', async () => {
    //   const response = await requester.get(`/api/users/${userId}`).set('Cookie', [`${cookie.name}=${cookie.value}`])
    //   expect(response.statusCode).to.equal(200)
    //   expect(response.body.payload).to.have.property('_id')
    //   expect(response.body.payload._id).to.equal(userId)
    // })

    // it('El endpoint PUT /api/users/:id debe actualizar un user correctamente', async () => {
    //   const updatedUser = {
    //     first_name: 'DonPedro'
    //   }
    //   const response = await requester.put(`/api/users/${userId}`).send(updatedUser).set('Cookie', [`${cookie.name}=${cookie.value}`])
    //   expect(response.statusCode).to.equal(200)
    //   expect(response.body).to.have.property('payload')
    //   expect(response.body.payload.acknowledged).to.equal(true)
    //   expect(response.body.payload.modifiedCount).to.equal(1)
    // })

    // it('El endpoint DELETE /api/users/:id debe eliminar una mascota correctamente', async () => {
    //   const response = await requester.delete(`/api/users/${userId}`).set('Cookie', [`${cookie.name}=${cookie.value}`])

    //   expect(response.statusCode).to.equal(200)
    //   expect(response.body).to.have.property('payload')
    //   expect(response.body.payload.acknowledged).to.equal(true)
    //   expect(response.body.payload.deletedCount).to.equal(1)
    // })
  })

  // TODO PRODUCTS ---------------------------------------------------------------
  describe('Testing de JWT admin + /api/products', () => {
    let cookie
    it('Logout para borrar la cookie del register', async () => {
      const result = await requester.get('/views/logout')
    })

    it('El servicio debe loguear un usuario correctamente y devolver una cookie para jwt', async () => {
      const userMock = {
        email: 'javi@a.com',
        password: 'javi1234'
      }

      const result = await requester.post('/passport/login').send(userMock)
      const cookieResult = result.headers['set-cookie'][0]
      expect(cookieResult).to.be.ok
      cookie = {
        name: cookieResult.split('=')[0],
        value: cookieResult.split('=')[1]
      }

      expect(cookie.name).to.be.ok.and.eql('coderCookieToken')
      expect(cookie.value).to.be.ok
    }).timeout(3000)

    it('El endpoint de GET /api/products debe mostrar todos los usuarios correctamente', async () => {
      const { statusCode, _body, ok } = await requester.get('/api/products').set('Cookie', [`${cookie.name}=${cookie.value}`])
      expect(ok).to.be.equal(true)
      expect(statusCode).to.be.equal(200)
    })

    //   it('El endpoint de POST /api/users debe crear un usuario correctamente', async () => {
    //     const userMock = {
    //       nickname: 'LaPulgaaa',
    //       first_name: 'Pedro',
    //       last_name: 'Pascal',
    //       age: 48,
    //       email: 'pedrito2@a.com',
    //       password: 'pedrito123',
    //       role: 'user'
    //     }

    //     const response = await requester.post('/api/users').send(userMock).set('Cookie', [`${cookie.name}=${cookie.value}`])
    //     expect(response.statusCode).to.equal(200)
    //     expect(response.body).to.have.property('payload')
    //     expect(response.body.payload).to.have.property('_id')
    //     userId = response.body.payload._id
    //   })

    //   it('El endpoint de GET /api/users by ID', async () => {
    //     const response = await requester.get(`/api/users/${userId}`).set('Cookie', [`${cookie.name}=${cookie.value}`])
    //     expect(response.statusCode).to.equal(200)
    //     expect(response.body.payload).to.have.property('_id')
    //     expect(response.body.payload._id).to.equal(userId)
    //   })

    //   it('El endpoint PUT /api/users/:id debe actualizar un user correctamente', async () => {
    //     const updatedUser = {
    //       first_name: 'DonPedro'
    //     }
    //     const response = await requester.put(`/api/users/${userId}`).send(updatedUser).set('Cookie', [`${cookie.name}=${cookie.value}`])
    //     expect(response.statusCode).to.equal(200)
    //     expect(response.body).to.have.property('payload')
    //     expect(response.body.payload.acknowledged).to.equal(true)
    //     expect(response.body.payload.modifiedCount).to.equal(1)
    //   })

    //   it('El endpoint DELETE /api/users/:id debe eliminar una mascota correctamente', async () => {
    //     const response = await requester.delete(`/api/users/${userId}`).set('Cookie', [`${cookie.name}=${cookie.value}`])

    //     expect(response.statusCode).to.equal(200)
    //     expect(response.body).to.have.property('payload')
    //     expect(response.body.payload.acknowledged).to.equal(true)
    //     expect(response.body.payload.deletedCount).to.equal(1)
    //   })
    // })

    // TODO Upload
    // describe('Test uploads', () => {
    //   it('El servicio debe crear una mascota con la ruta para imagen', async () => {
    //     const petMock = {
    //       name: 'Patitas',
    //       specie: 'Perro',
    //       birthDate: '10-10-2022'
    //     }

    //     const result = await requester.post('/api/pets/withimage')
    //       .field('name', petMock.name)
    //       .field('specie', petMock.specie)
    //       .field('birthDate', petMock.birthDate)
    //       .attach('image', './test/patitas.jpg')

  //     expect(result.statusCode).to.be.eql(200)
  //     expect(result._body.payload).to.have.property('_id')
  //     expect(result._body.payload.image).to.be.ok
  //   })
  })
})
