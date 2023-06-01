const passport = require("passport")
const jwt = require("passport-jwt")
require("dotenv").config()

const JWTStrategy = jwt.Strategy
const ExtractJWT = jwt.ExtractJwt

const cookieExtractor = (req) => {
  let token = null
  console.log(req.cookies)
  if (req && req.cookies) {
    token = req.cookies["coderCookieToken"]
  }
  // console.log(token)
  return token
}

const initPassport = () => {
  passport.use(
    "jwt",
    new JWTStrategy(
      {
        jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),
        secretOrKey: "claveDev",
      },
      async (jwt_payload, done) => {
        try {
          //! validacion usuario + donde(null, false, {message: 'Usuario no encontrado'})
          return done(null, jwt_payload)
        } catch (error) {
          return done(error)
        }
      }
    )
  )
}

module.exports = {
  initPassport,
}
