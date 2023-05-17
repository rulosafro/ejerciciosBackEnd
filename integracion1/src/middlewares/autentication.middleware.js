function auth(req, res, next) {
  console.log("auth", req.session)
  if (req.session?.user.first_name !== "javi" || !req.session?.user?.admin === "admin") {
    return res.status(401).send("error de autentificación")
  }
  next()
}

module.exports = {
  auth,
}
