const { Router } = require("express")
const passport = require("passport")
const { generateToken } = require("../utils/jwt")

const router = Router()

router.get("/github", passport.authenticate("github", { scope: ["user:email"] }))
router.get("/githubcallback", passport.authenticate("github", { failureRedirect: "/views/login" }), async (req, res) => {
  let try1 = await req.user.toJSON()
  const accessToken = generateToken(try1)
  res.cookie("coderCookieToken", accessToken, { maxAge: 60 * 60 * 1000 }).redirect("/views/products")
})

module.exports = router
