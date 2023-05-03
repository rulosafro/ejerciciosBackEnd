const { Router } = require("express")
const productsRouter = require("./products.router")
const usuariosRouter = require("./usuarios.router")
const { uploader } = require("../utils/multer")

const router = Router()

router.get("/", (req, res) => {
  res.status(200).send("Hola Index")
})

router.use("/productos", productsRouter)
router.use("/usuarios", usuariosRouter)

router.post("/upload", uploader.single("myFile"), (req, res) => {
  res.send({
    status: "success",
    mensaje: "Archivo subido ",
  })
})

module.exports = router
