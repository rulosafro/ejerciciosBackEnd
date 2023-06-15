const { Router } = require("express")
const passportCall = require("../middlewares/passportCall")
const { authorization } = require("../middlewares/authorizationJwtRole")
const passport = require("passport")

const router = Router()

//? Passport

router.post(
  "/login",
  passport.authenticate("login", {
    successRedirect: "/views/products",
    failureRedirect: "/faillogin",
    failureFlash: true,
  }),
  async (req, res) => {
    try {
      if (!req.user) {
        return res.status(401).send({ status: "error", message: "Credencial invalida" })
      }

      req.user = {
        first_name: req.user.first_name,
        last_name: req.user.last_name,
        email: req.user.email,
        role: req.user.role,
      }

      res.send({ status: "success", message: "User Registrado" })
    } catch (error) {
      console.log(error)
    }
  }
)

router.get("/faillogin", (req, res) => {
  console.log("Fallo el login")
  res.send({ status: "error", message: "Estrategia invalida" })
})

router.post(
  "/register",
  passport.authenticate("register", {
    successRedirect: "/views/products",
    failureRedirect: "/failregister",
    failureFlash: true,
  }),
  async (req, res) => {
    res.send({ status: "success", message: "User Register" })
  }
)

router.get("/failregister", (req, res) => {
  console.log("Fallo el login")
  res.send({ status: "error", message: "Autentificación invalida" })
})

module.exports = router
