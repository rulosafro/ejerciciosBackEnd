function auth(req, res, next) {
  if (req.session?.user !== "javi" || !req.session?.admin) {
    return res.status(401).send("error de autentificación")
  }
  next()
}

module.exports = {
  auth,
}
