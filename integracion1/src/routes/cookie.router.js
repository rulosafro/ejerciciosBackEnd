const { Router, request } = require("express")
const { auth } = require("../middlewares/autentication.middleware")
const router = Router()

router.get("/set", (req, res) => {
  res.cookie("Codercokie", "Esta es una cookie NO firmada", { maxAge: 10000 }).send("cookieset")
})

router.get("/get", (req, res) => {
  res.send(req.cookies)
})

router.get("/setSign", (req, res) => {
  res.cookie("SignedCookie", "Esta es una cookie firmada", { maxAge: 10000, signed: true }).send("cookieset with sign")
})

router.get("/getSign", (req, res) => {
  res.send(req.signedCookies)
})

router.get("/delete", (req, res) => {
  res.clearCookie("Codercokie").send("eliminada")
})

router.get("/", auth, (req, res) => {
  res.send("Todo lo de acá solo lo puede ver los admins")
})

// Sessopmes
// router.get("/session", (req, res) => {
//   if (req.session.counter) {
//     req.session.counter++
//     res.send(`se ha visitado el sitio ${req.session.counter}`)
//   } else {
//     req.session.counter = 1
//     res.send("bienvenido")
//   }
// })

// router.post("/session", async (req, res) => {
//   const { username, password } = req.body
//   if (username !== "javi" || password !== "javi123") {
//     return res.send("login failed")
//   }
//   req.session.user = username
//   req.session.admin = true
//   res.send("login success")
// })

// router.get("/logout", (req, res) => {
//   req.session.destroy((err) => {
//     if (err) {
//       return res.send({ status: "error", error: err })
//     }
//     res.send("logout ok")
//   })
// })

module.exports = router
