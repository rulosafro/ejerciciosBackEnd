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

router.get("/counter", getCounter)
router.get("/privada", midAdmin, getPrivada)
router.get("/current", midAdmin, getCurrent)
router.post("/login", getLogin)
router.post("/register", getRegister)
router.get("/logout", getLogout)

module.exports = router
