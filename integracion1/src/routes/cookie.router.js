const { Router, request } = require("express")
const { auth } = require("../middlewares/auth.middleware")
const passportCall = require("../middlewares/passportCall")
const { authorization } = require("../middlewares/authorizationJwtRole")
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
