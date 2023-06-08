const passport = require("passport")
const local = require("passport-local")
const GithubStrategy = require("passport-github2")
const { userModel } = require("../dao/mongo/models/user.model")
const { createHash, validPassword } = require("../utils/bcryptHash")
const LocalStrategy = local.Strategy
require("dotenv").config()

const initPassportMid = () => {
  passport.use(
    "register",
    new LocalStrategy(
      {
        passReqToCallback: true,
        usernameField: "email",
      },
      async (req, username, password, done) => {
        const { first_name, last_name } = req.body
        try {
          let userDB = await userModel.findOne({ email: username })
          if (userDB) {
            return done(null, false)
          }
          let newUser = {
            first_name,
            last_name,
            email: username,
            password: await createHash(password),
            role: "user",
          }
          let result = userModel.create(newUser)
          return done(null, result)
        } catch (error) {
          return done("Error al obtener usuario" + error)
        }
      }
    )
  )

  passport.serializeUser((user, done) => {
    done(null, user.id)
  })

  passport.deserializeUser(async (id, done) => {
    let user = await userModel.findOne({ _id: id })
    done(null, user)
  })

  passport.use(
    "login",
    new LocalStrategy(
      {
        usernameField: "email",
      },
      async (username, password, done) => {
        const userDB = await userModel.findOne({ email: username })
        try {
          if (!userDB) return done(null, false)
          if (!validPassword(password, userDB)) return done(null, false)
          return done(null, userDB)
        } catch (error) {
          return done(error)
        }
      }
    )
  )
}

module.exports = { initPassportMid }
