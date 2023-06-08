const { Router } = require("express")
const { authorization } = require("../passport-jwt/authorizationJwtRole")
const passportCall = require("../passport-jwt/passportCall")
const router = Router()

router.get("/", passportCall("jwt"), authorization("user"), (req, res) => {
  data = {
    titulo1: "Bienvenido33",
    info: "Estas entrando a la mejor tienda de relojeria",
  }
  res.render("home", data)
})

module.exports = router
