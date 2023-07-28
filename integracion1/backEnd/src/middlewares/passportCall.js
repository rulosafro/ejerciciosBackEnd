const passport = require('passport')

const passportCall = (strategy, options) => {
  return async (req, res, next) => {
    passport.authenticate(strategy, options, function (err, user, info) {
      if (err) return next(err)
      if (!user) return res.status(401).render('login', { status: 'error', message: info.message ? info.message : info.toString() })
      // if (!user) return res.status(401).send({ status: "error", message: info.message ? info.message : info.toString() })
      req.user = user
      next()
    })(req, res, next)
  }
}

const passportCall2 = (strategy, options) => {
  return async (req, res, next) => {
    passport.authenticate(strategy, options, function (err, user, info) {
      if (err) return next(err)
      // if (!user) return res.status(401).render('login', { status: 'error', message: info.message ? info.message : info.toString() })
      // if (!user) return res.status(401).send({ status: "error", message: info.message ? info.message : info.toString() })
      req.user = user
      next()
    })(req, res, next)
  }
}

module.exports = { passportCall, passportCall2 }
