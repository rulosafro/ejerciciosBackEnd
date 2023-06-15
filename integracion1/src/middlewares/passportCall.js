const passport = require("passport");

//@fix: NECESITAMOS PASAR EL OPTIONS
const passportCall = (strategy, options) => {
  return async (req, res, next) => {
    passport.authenticate(strategy, options, function (err, user, info) {
      if (err) return next(err);
      if (!user)
        return res.status(401).render("login", {
          status: "error",
          // @fix: tuve que poner esto en duro para que no tire error, fijate de revisarlo despues
          message: "info.message ? info.message : info.toString()",
        });
      req.user = user;
      next();
    })(req, res, next);
  };
};

module.exports = passportCall;
