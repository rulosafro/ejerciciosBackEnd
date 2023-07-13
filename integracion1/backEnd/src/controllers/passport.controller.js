const { userModel } = require('../Daos/mongo/models/user.model')
const { cartService } = require('../service/index.service')
const { validPassword, createHash } = require('../utils/bcryptHash')
const { generateToken } = require('../utils/jwt')
const passportCall = require('../middlewares/passportCall')

const { CustomError } = require('../utils/CustomError/CustomError')
const { generateRegisterErrorInfo, generateLoginErrorInfo } = require('../utils/CustomError/info')
const { EError } = require('../utils/CustomError/Erros')

class PassportController {
  getLogin = async (req, res, next) => {
    try {
      const { username, password } = req.body
      const userDB = req.user
      // console.log(req.user)
      const emailUser = req.body.email

      if (!emailUser || !password) {
        CustomError.createError({
          name: 'User login fail',
          cause: generateLoginErrorInfo({
            emailUser, password
          }),
          message: 'Error trying to login',
          code: EError.INVALID_VALUE_ERROR
        })
      }
      const access_Token = generateToken({
        first_name: userDB.first_name,
        last_name: userDB.last_name,
        email: userDB.email,
        role: userDB.role,
        id: userDB._id,
        age: userDB.age,
        cart: userDB.cart
      })

      res
        .cookie('coderCookieToken', access_Token, {
          maxAge: 60 * 60 * 100,
          httpOnly: true
        })
        // .send(access_Token)
        .redirect('/views/products')
    } catch (error) {
      next(error)
    }
  }

  getRegister = async (req, res, next) => {
    try {
      const { first_name, last_name, age, nickname } = req.body

      if (!first_name || !last_name || !age || !nickname) {
        CustomError.createError({
          name: 'User register fail',
          cause: generateRegisterErrorInfo(
            first_name, last_name, age, nickname
          ),
          message: 'Error trying to register',
          code: EError.INVALID_TYPE_ERROR
        })
      }
      const newUser = req.user
      const token = generateToken(newUser)

      res
        .status(200)
        .cookie('coderCookieToken', token, { maxAge: 60 * 60 * 1000, httpOnly: true })
        // .send(token)
        .redirect('/views/products')
    } catch (error) {
      next(error)
    }
  }

  failLogin = (req, res) => {
    console.log('Fallo el login')
    res.send({ status: 'error', message: 'Estrategia invalida' })
  }

  failRegister = (req, res) => {
    console.log('Fallo el login')
    res.send({ status: 'error', message: 'Autentificación invalida' })
  }
}

module.exports = new PassportController()
