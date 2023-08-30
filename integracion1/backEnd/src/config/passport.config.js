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
require('dotenv').config()

const { CustomError } = require('../utils/CustomError/CustomError')
const { EError } = require('../utils/CustomError/Erros')
const { generateLoginErrorInfo, generateRegisterErrorInfo } = require('../utils/CustomError/info')
const { logger } = require('./logger')

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
              name: 'User register fail',
              cause: generateRegisterErrorInfo(
                first_name, last_name, age, nickname
              ),
              message: 'Error trying to register',
              code: EError.INVALID_TYPE_ERROR
            })
          }

          const userDB = await userModel.findOne({ email: username })
          if (!userDB) {
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
            cart: carrito._id,
            last_connection: Date.now()
          }
          const result = await userService.add(newUser)
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
      async (username, password, done, next) => {
        try {
          const userDB = await userModel.findOne({ email: username })
          const update = await userModel.findOneAndUpdate({ email: username }, { last_connection: Date.now() })
          const validacionPassword = await validPassword(password, userDB)

          if (!userDB) return done(null, false)
          if (!update) return done(null, false)
          if (!validacionPassword) return done(null, false)
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
        clientID: 'Iv1.9daae68a5123e71f',
        clientSecret: '88efcf6279b508ddb2f89170a80059fdcd6db55c',
        callbackURL: 'http://localhost:8080/github/githubcallback'
      },
      async (accessToken, refreshToken, profile, done) => {
        // logger.info('Profile', profile)
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
            await logger.info('newUser', newUser)
            return done(null, result)
          }
          logger.info('User', user)
          return done(null, user)
        } catch (error) {
          logger.error(error)
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
