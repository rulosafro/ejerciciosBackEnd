const passport = require('passport')

const passportCall = (strategy, options) => {
  return async (req, res, next) => {
    passport.authenticate(strategy, options, function (err, user, info) {
      if (err) return res.status(401).render('login', { status: 'error', message: 'Hubo un fallo, vuelve a intentar.' })
      if (!user) return res.status(401).render('login', { status: 'error', message: info.message ? info.message : info.toString() })
      req.user = user
      next()
    })(req, res, next)
  }
}

module.exports = { passportCall }
