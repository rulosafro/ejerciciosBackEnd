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

module.exports = router
