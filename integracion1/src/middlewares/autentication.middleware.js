function auth(req, res, next) {
  console.log("auth", req.session)
  req.session.user ? (user = req.session.user) : (user = false)
  // let user = req.session?.user
  if (user.role !== "user" && user.role !== "admin") {
    return res.status(301).render("login", {
      message: "Ingresa con tu cuenta para entrar a la tienda",
      style: "text-warning",
    })
  }
  next()
}

module.exports = {
  auth,
}
