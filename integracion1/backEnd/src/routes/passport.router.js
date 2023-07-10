const { Router } = require("express")
const { getLogin, getRegister, failLogin, failRegister } = require("../controllers/passport.controller")
const passportCall = require("../middlewares/passportCall")

const router = Router()

router.post("/login", passportCall("login", { session: false }), getLogin)
router.post("/register", passportCall("register", { session: false }), getRegister)
router.get("/faillogin", failLogin)
router.get("/failregister", failRegister)

module.exports = router
