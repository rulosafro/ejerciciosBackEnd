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

passport.serializeUser((user, done) => {
  done(null, user)
})

passport.deserializeUser(async (user, done) => {
  // let user = await userModel.findOne({ _id: id })
  done(null, user)
})

const initPassportGithub = () => {
  passport.use(
    "github",
    new GithubStrategy(
      {
        clientID: "Iv1.59474a1e33b56236",
        clientSecret: "3c586c9ac0e4ee0d5f5064c1fbc33d3fb960f385",
        callbackURL: "http://localhost:8080/session/githubcallback",
      },
      async (accessToken, refreshToken, profile, done) => {
        console.log("Profile", profile)
        try {
          let user = await userModel.findOne({ email: profile._json.email })
          if (!user) {
            let newUser = {
              first_name: profile.name,
              last_name: profile.name,
              // email: profile._json.email,
              email: "javi@a.com",
              password: "",
              // password: await createHash(password),
              // role: "user",
            }
            let result = userModel.create(newUser)
            return done(null, result)
          }
          return done(null, user)
        } catch (error) {
          console.log(error)
        }
      }
    )
  )
  // passport.serializeUser((user, done) => {
  //   done(null, user._id)
  // })

  // passport.deserializeUser(async (id, done) => {
  //   let user = await userModel.findOne({ _id: id })
  //   done(null, user)
  // })
}

module.exports = { initPassportMid, initPassportGithub }
