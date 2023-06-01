const authorization2 = (role) => {
  return async (req, res, next) => {
    // console.log("role", role)
    // console.log("user", req.user)
    if (!req.user) {
      return res.status(401).render("login", { status: "error", message: "Debes ingresar para acceder a la web", style: "text-danger" })
    }

    if (req.user.role !== role && req.user.role !== "admin" && req.user.role !== "user") {
      return res.status(403).render("login", { status: "error", message: "Necesitas permiso de Administrador", style: "text-warning" })
    }
    next()
  }
}

module.exports = {
  authorization2,
}
