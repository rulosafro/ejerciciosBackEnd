const { Router } = require("express")
const router = Router()

const nombres = ["javi", "isi"]

router.param("nombre", async (req, res, next, nombre) => {
  if (!nombres.includes(nombre)) {
    req.nombre = null
    res.send("No existe el nombre papito")
  } else {
    req.nombre = nombre
  }
  next()
})

router.get("/params/:nombre([a-zA-Z]+)", (req, res) => {
  res.send({ message: "lo lograste crack", nombre: req.params.nombre })
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
