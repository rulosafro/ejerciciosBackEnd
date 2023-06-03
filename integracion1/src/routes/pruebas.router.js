const { Router } = require("express")
const router = Router()

router.get("/params/:nombre([a-zA-Z])", (req, res) => {
  res.send({ message: "hola" })
})

// router.get("/setSign", (req, res) => {
//   res
//     .cookie("SignedCookie", "Esta es una cookie firmada", {
//       maxAge: 10000,
//       signed: true,
//     })
//     .send("cookieset with sign")
// })

// router.get("/getSign", (req, res) => {
//   res.send(req.signedCookies)
// })

// router.get("/delete", (req, res) => {
//   res.clearCookie("Codercokie").send("eliminada")
// })

// router.get("/", passportCall("jwt"), authorization("admin"), (req, res) => {
//   res.send("Todo lo de acá solo lo puede ver los admins")
// })

module.exports = router
