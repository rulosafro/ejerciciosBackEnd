const passport = require("passport")
const local = require("passport-local")
const GithubStrategy = require("passport-github2")
const { userModel } = require("../dao/mongo/models/user.model")
const { createHash, validPassword } = require("../utils/bcryptHash")
const LocalStrategy = local.Strategy
require("dotenv").config()

const initPassportGithub = () => {
  passport.use(
    "github",
    new GithubStrategy(
      {
        clientID: "Iv1.59474a1e33b56236",
        clientSecret: "3c586c9ac0e4ee0d5f5064c1fbc33d3fb960f385",
        callbackURL: "http://localhost:8080/session/github/githubcallback",
      },
      async (accessToken, refreshToken, profile, done) => {
        console.log("Profile", profile)
        try {
          let user = await userModel.findOne({ email: profile._json.email })
          if (!user) {
            let newUser = {
              first_name: profile.displayName,
              last_name: profile.displayName,
              username: profile.username,
              email: profile._json.email,
              // password: await createHash(profile.id),
              password: "",
              role: "user",
              age: null,
              // id: profile.id,
            }
            let result = await userModel.create(newUser)
            await console.log("newUser", newUser)
            return done(null, result)
          }
          console.log("User", user)
          return done(null, user)
        } catch (error) {
          console.log(error)
        }
      }
    )
  )

  // passport.serializeUser((user, done) => {
  //   done(null, user)
  // })

  // passport.deserializeUser(async (user, done) => {
  //   done(null, user)
  // })

  passport.serializeUser((user, done) => {
    done(null, user._id)
  })

  passport.deserializeUser(async (id, done) => {
    let user = await userModel.findOne({ _id: id })
    done(null, user)
  })
}

module.exports = { initPassportGithub }
