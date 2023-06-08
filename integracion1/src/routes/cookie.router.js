const { Router, request } = require("express")
const { auth } = require("../middlewares/autentication.middleware")
const passportCall = require("../passport-jwt/passportCall")
const { authorization } = require("../passport-jwt/authorizationJwtRole")
const router = Router()

router.get("/set", (req, res) => {
  res.cookie("Codercokie", "Esta es una cookie NO firmada", { maxAge: 10000 }).send("cookieset")
})

router.get("/get", (req, res) => {
  res.send(req.cookies)
})

router.get("/setSign", (req, res) => {
  res
    .cookie("SignedCookie", "Esta es una cookie firmada", {
      maxAge: 10000,
      signed: true,
    })
    .send("cookieset with sign")
})

router.get("/getSign", (req, res) => {
  res.send(req.signedCookies)
})

router.get("/delete", (req, res) => {
  res.clearCookie("Codercokie").send("eliminada")
})

router.get("/", passportCall("jwt"), authorization("admin"), (req, res) => {
  res.send("Todo lo de acá solo lo puede ver los admins")
})

module.exports = router
