const { Router, request } = require("express")
const { auth } = require("../middlewares/auth.middleware")
const passportCall = require("../middlewares/passportCall")
const { authorization } = require("../middlewares/authorizationJwtRole")
const { setCookie, setSignCookie, getSignCookie, deleteCookie, privateRoute } = require("../controllers/cookie.controller")
const router = Router()

router.get("/", passportCall("jwt"), authorization("admin"), privateRoute)
router.get("/set", setCookie)
router.get("/get", setSignCookie)
router.get("/setSign", setSignCookie)
router.get("/getSign", getSignCookie)
router.get("/delete", deleteCookie)

module.exports = router
