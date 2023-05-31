function auth2(req, res, next) {
  console.log("auth", req.session)
  req.session.user ? (user = req.session.user) : (user = false)
  // let user = req.session?.user
  if (user.role !== "admin") {
    return res.status(301).render("error", {
      message: "Se necesita un administrador para acceder a esta página",
      style: "text-warning",
    })
  }
  next()
}

module.exports = {
  auth2,
}
