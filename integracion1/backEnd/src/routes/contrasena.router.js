const { Router } = require('express')
const { logger } = require('../config/logger')
const { userService, updateUser } = require('../controllers/users.controller')
const { sendMail } = require('../utils/sendmail')
const { generateTokenPassword } = require('../utils/jwt')
const { createHash, validPassword } = require('../utils/bcryptHash')
const { passportCall } = require('../middlewares/passportCall')
const { initPassportJWT } = require('../config/passport.config')
const { userModel } = require('../Daos/mongo/models/user.model')
const router = Router()

router.get('/', (req, res) => res.status(200).render('recuperar', {}))
router.get('/nueva', passportCall('jwt'), (req, res) => res.status(200).render('formularioRecuperacion', {}))

router.post('/', async (req, res, next) => {
  try {
    const { email } = req.body
    if (!email) res.render('recuperar', { status: 'error', message: 'Falta llenar todos los inputs', style: 'text-danger' })
    const userData = await userService.getByMail(email)
    if (!userData) res.render('recuperar', { status: 'error', message: 'No se ha encontrado un usuario con este email', style: 'text-danger' })
    const html = '<div><h1> Restablece tu contraseña </h1> <p> Haz click en el siguiente enlace para llegar al link e ingresar tu nueva contraseña</p> <blockquote> El link tiene una hora de validez </blockquote> <blockquote> Es importante que mantengas en el mismo explorador </blockquote> <br> <button> <a href="http://localhost:8080/recuperar/nueva" target="_blank"> Cambiar contraseña </a> </button></div>'

    await sendMail(email, 'Restablecer contraseña CodeOwner', html)

    const newData = {
      email,
      key: createHash(email),
      special: 'recuperación'
    }

    const access_Token = generateTokenPassword(newData)

    res
      .status(200)
      .cookie('coderCookieToken', access_Token, { maxAge: 60 * 60 * 1000, httpOnly: true })
    // .cookie('coderCookieToken', access_Token, { maxAge: 600 * 60 * 1000 })
      .send('Se ha enviado un email a tu correo para restablecer tu contraseña')
  } catch (error) {
    next(error)
  }
})

router.post('/nueva', passportCall('jwt'), async (req, res, next) => {
  try {
    const { contrasenaNueva, validacionNueva } = req.body
    const person = await userService.getByMail(req.user.email)
    const time = Math.floor(new Date().getTime() / 1000)

    if (!contrasenaNueva || !validacionNueva) res.render('formularioRecuperacion', { status: 'error', message: 'Falta llenar todos los inputs', style: 'text-danger' })
    if (contrasenaNueva !== validacionNueva) res.render('formularioRecuperacion', { status: 'error', message: 'Los valores no son iguales', style: 'text-danger' })
    if (time > req.user.exp) res.render('login', { status: 'error', message: 'Se expiró el código, vuelve a generar uno', style: 'text-danger' })
    if (validPassword(contrasenaNueva, person)) { res.send('La contraseña tiene que ser diferente a tu contraseña anterior') }

    await userModel.findOneAndUpdate({ _id: person._id }, { password: createHash(contrasenaNueva) })
    res
      .status(200)
      .render('login', { status: 'success', message: 'cambio de clave exitoso, ingresa a tu cuenta', style: '' })
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
