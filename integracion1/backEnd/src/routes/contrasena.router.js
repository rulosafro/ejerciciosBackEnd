const { Router } = require('express')
const { logger } = require('../config/logger')
const { userService, updateUser } = require('../controllers/users.controller')
const { sendMail } = require('../utils/sendmail')
const { generateTokenPassword } = require('../utils/jwt')
const { createHash, validPassword } = require('../utils/bcryptHash')
const { passportCall2 } = require('../middlewares/passportCall')
const { initPassportJWT } = require('../config/passport.config')
const { userModel } = require('../Daos/mongo/models/user.model')
const router = Router()

router.get('/', (req, res) => res.status(200).render('recuperar', {}))
router.get('/nueva', passportCall2('jwt'), (req, res) => res.status(200).render('formularioRecuperacion', {}))

router.post('/nueva', passportCall2('jwt'), async (req, res, next) => {
  try {
    const { contrasenaNueva, validacionNueva } = req.body

    if (!contrasenaNueva || !validacionNueva) { res.send('falta ingresar los valores') }
    contrasenaNueva !== validacionNueva && res.send('Los valores no coinciden')
    const person = await userService.getByMail(req.user.email)
    if (validPassword(contrasenaNueva, person)) { res.send('La contraseña tiene que ser diferente a tu contraseña anterior') }

    // console.log('🚀 ~ file: contrasena.router.js:25 ~ router.post ~ person:', person)

    userModel.findOneAndUpdate({ email: 'javi@a.com' }, { $set: { password: createHash(contrasenaNueva) } })
    // userService.updateUser
    res
      .status(200)
      .send('oal')
      // .redirect('/views/products')
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const { email } = req.body
    const userData = await userService.getByMail(email)
    if (!email) res.status(404).send('Debes ingresar un email')
    if (!userData) res.status(404).send('No encontramos un usuario con este email')
    const html = '<div><h1> Restablece tu contraseña </h1> <p> Haz click en el siguiente enlace para llegar al link e ingresar tu nueva contraseña</p> <blockquote> El link tiene una hora de validez </blockquote> <blockquote> Es importante que mantengas en el mismo explorador </blockquote> <br> <button> <a href="http://localhost:8080/recuperar/nueva" target="_blank"> Cambiar contraseña </a> </button></div>'

    // todo:
    await sendMail(email, 'Restablecer contraseña CodeOwner', html)

    const newData = {
      email,
      key: createHash(email),
      special: 'recuperación'
    }

    // newData += req.user
    const access_Token = generateTokenPassword(newData)

    res
      .status(200)
      .cookie('coderCookieToken', access_Token, { maxAge: 60 * 60 * 100, httpOnly: true })
      // .cookie('coderCookieToken', access_Token, { maxAge: 600 * 60 * 1000 })
      .send('Se ha enviado un email a tu correo para restablecer tu contraseña')
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
