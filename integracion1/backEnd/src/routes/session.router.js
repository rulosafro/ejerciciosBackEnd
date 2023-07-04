const { Router } = require("express")
const passportCall = require("../middlewares/passportCall")
const githubRouter = require("./github.router")
const passportRouter = require("./passport.router")
const { getCounter, getPrivada, getCurrent, getLogin, getRegister, getLogout } = require("../controllers/session.controller")
const { authorization } = require("../middlewares/authorizationJwtRole")

const midAdmin = [passportCall("jwt"), authorization("admin")]
// const midAdmin = []

const router = Router()

router.use("/passport", passportRouter)
router.use("/github", githubRouter)

router.get("/current", midAdmin, getCurrent)
router.get("/privada", midAdmin, getPrivada)
router.post("/register", getRegister)
router.post("/login", getLogin)
router.get("/logout", getLogout)
router.get("/counter", getCounter)

module.exports = router
