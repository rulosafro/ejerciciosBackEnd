const { Router } = require('express')
const { logger } = require('../config/logger')
const { userService } = require('../controllers/users.controller')
const { userModel } = require('../Daos/mongo/models/user.model')
const { sendMail } = require('../utils/sendmail')
const router = Router()

router.get('/', (req, res) => res.status(200).render('recuperar', {}))

router.post('/', async (req, res, next) => {
  try {
    const { email } = req.body
    const userData = await userService.getByMail(email)
    if (!email) res.status(404).send('Debes ingresar un email')
    if (!userData) res.status(404).send('No encontramos un usuario con este email')

    const html = '<div><h1> Este es un test </h1></div>'
    await sendMail(email, 'Restablecer contraseña CodeOwner', html)
    res.status(200).send('Se ha enviado un email a tu correo para restablecer tu contraseña')

    // .cookie('coderCookieToken', access_Token, {
    //   maxAge: 60 * 60 * 100,
    //   httpOnly: true
    // })
    // .redirect('/views/products')
    // .send(data)

    // const emailUser = req.body.email
    // const access_Token = generateToken({
    //   first_name: userDB.first_name,
    //   last_name: userDB.last_name,
    //   email: userDB.email,
    //   role: userDB.role,
    //   id: userDB._id,
    //   age: userDB.age,
    //   cart: userDB.cart
    // })
  } catch (error) {
    next(error)
  }
})

module.exports = router

// if (!emailUser || !password) {
//   CustomError.createError({
//     name: 'User login fail',
//     cause: generateLoginErrorInfo({
//       emailUser, password
//     }),
//     message: 'Error trying to login',
//     code: EError.INVALID_VALUE_ERROR
//   })
// }
