const passport = require('passport')
const local = require('passport-local')
const { userModel } = require('../Daos/mongo/models/user.model')
const { createHash, validPassword } = require('../utils/bcryptHash')

const jwt = require('passport-jwt')
const JWTStrategy = jwt.Strategy
const ExtractJWT = jwt.ExtractJwt
const LocalStrategy = local.Strategy
const GithubStrategy = require('passport-github2')
const { userService, cartService } = require('../service/index.service')
const { CustomError } = require('../utils/CustomError/CustomError')
const { EError } = require('../utils/CustomError/Erros')
const { generateRegisterErrorInfo, generateLoginErrorInfo } = require('../utils/CustomError/info')
require('dotenv').config()

const initPassportMid = () => {
  passport.use(
    'register',
    new LocalStrategy(
      {
        passReqToCallback: true,
        usernameField: 'email'
      },
      async (req, username, password, done) => {
        try {
          const { first_name, last_name, age, nickname } = req.body

          if (!first_name || !last_name || !age || !nickname) {
            CustomError.createError({
              name: 'User login fail',
              cause: generateRegisterErrorInfo({
                nickname, first_name, last_name, password, age
              }),
              message: 'Error trying to login',
              code: EError.INVALID_TYPE_ERROR
            })
          }

          const userDB = await userModel.findOne({ email: username })
          if (userDB) {
            return done(null, false)
          }
          const carrito = await cartService.create()
          const newUser = {
            first_name,
            last_name,
            email: username,
            password: await createHash(password),
            role: 'user',
            age,
            nickname,
            cart: carrito._id
          }
          const result = await userService.add(newUser)
          // console.log("🚀 ~ file: passport.config.js:40 ~ result:", result)
          // console.log(result)
          return done(null, newUser)
        } catch (error) {
          return done('Error al crear usuario' + error)
        }
      }
    )
  )

  passport.use(
    'login',
    new LocalStrategy(
      {
        usernameField: 'email'
      },
      async (username, password, done) => {
        try {
          const userDB = await userModel.findOne({ email: username })
          if (!username || !password) {
            CustomError.createError({
              name: 'User login fail',
              cause: generateLoginErrorInfo({
                username, password
              }),
              message: 'Error trying to login',
              code: EError.INVALID_TYPE_ERROR
            })
          }
          if (!userDB) return done(null, false)
          if (!validPassword(password, userDB)) return done(null, false)
          return done(null, userDB)
        } catch (error) {
          return done(error)
        }
      }
    )
  )

  passport.serializeUser((user, done) => {
    done(null, user._id)
  })

  passport.deserializeUser(async (id, done) => {
    const user = await userModel.findOne({ _id: id })
    done(null, user)
  })
}

const cookieExtractor = (req) => {
  let token = null
  if (req && req.cookies) {
    token = req.cookies.coderCookieToken
  }
  return token
}

const initPassportJWT = () => {
  passport.use(
    'jwt',
    new JWTStrategy(
      {
        jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),
        secretOrKey: process.env.SECRET_KEY
      },
      async (jwt_payload, done) => {
        try {
          //! validacion usuario + donde(null, false, {message: 'Usuario no encontrado'})
          return await done(null, jwt_payload)
        } catch (error) {
          return done(error)
        }
      }
    )
  )
}

const initPassportGithub = () => {
  passport.use(
    'github',
    new GithubStrategy(
      {
        clientID: 'Iv1.59474a1e33b56236',
        clientSecret: '3c586c9ac0e4ee0d5f5064c1fbc33d3fb960f385',
        callbackURL: 'http://localhost:8080/session/github/githubcallback'
      },
      async (accessToken, refreshToken, profile, done) => {
        console.log('Profile', profile)
        try {
          const user = await userModel.findOne({ email: profile._json.email })
          if (!user) {
            const newUser = {
              first_name: profile.displayName,
              last_name: profile.displayName,
              nickname: profile.username,
              email: profile._json.email,
              // password: await createHash(profile.id),
              password: '',
              role: 'user',
              age: null
              // id: profile.id,
            }
            const result = await userModel.create(newUser)
            await console.log('newUser', newUser)
            return done(null, result)
          }
          console.log('User', user)
          return done(null, user)
        } catch (error) {
          console.log(error)
        }
      }
    )
  )

  passport.serializeUser((user, done) => {
    done(null, user._id)
  })

  passport.deserializeUser(async (id, done) => {
    const user = await userModel.findOne({ _id: id })
    done(null, user)
  })
}

module.exports = { initPassportGithub, initPassportMid, initPassportJWT, cookieExtractor }
