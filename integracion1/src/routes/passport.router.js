const { Router } = require("express")
const { getLogin, getRegister, failLogin, failRegister } = require("../controllers/passport.controller")

const router = Router()

router.post("/login", getLogin)
router.post("/register", getRegister)
router.get("/faillogin", failLogin)
router.get("/failregister", failRegister)

module.exports = router
