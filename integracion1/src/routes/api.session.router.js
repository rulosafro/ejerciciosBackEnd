const { Router } = require("express")
const passportCall = require("../passport-jwt/passportCall")
const router = Router()

router.get("/current", passportCall("jwt"), (req, res) => {
  res.send(req.user)
})

module.exports = router
