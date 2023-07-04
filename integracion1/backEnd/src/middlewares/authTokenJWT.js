exports.authToken = (req, res, next) => {
  const authHeader = req.headers["authorization"]
  if (!authHeader) {
    return res.status(401).send({ status: "error", error: "No autenticado" })
  }
  const token = authHeader.split(" ")[1]
  jwt.verify(token, process.env.SECRET_KEY, (error, credential) => {
    if (error) return res.status(403).send({ status: "error", error: "No autorizado" })
    req.user = credential.user
    next()
  })
}
