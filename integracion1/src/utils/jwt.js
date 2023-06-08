const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")
dotenv.config()

const generateToken = (user) => {
  const token = jwt.sign(user, process.env.SECRET_KEY, { expiresIn: "24h" })
  return token
}

const authToken = (req, res, next) => {
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

module.exports = {
  generateToken,
  authToken,
}
