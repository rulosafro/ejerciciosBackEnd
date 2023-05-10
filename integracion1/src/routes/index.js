const express = require("express")
const { Router } = require("express")
const productsRouter = require("./products.router")
const usuariosRouter = require("./usuarios.router")
const cartsRouter = require("./carts.router")
const messagesRouter = require("./messages.router")
const realtimeRouter = require("./realtime.router")
const registerRouter = require("./register.router")
const { Server } = require("socket.io")
const { uploader } = require("../utils/multer")

const router = Router()

// Links ----------------------------------------------------------------
router.get("/", (req, res) => {
  data = {
    titulo1: "Bienvenido33",
    info: "Estas entrando a la mejor tienda de relojeria",
  }
  res.render("home", data)
})

router.use("/static", express.static(__dirname + "./../public"))
router.use("/api/products", productsRouter)
router.use("/api/realtime", realtimeRouter)
router.use("/api/users", usuariosRouter)
router.use("/carts", cartsRouter)
router.use("/register", registerRouter)
router.use("/chat", messagesRouter)

router.post("/upload", uploader.single("myFile"), (req, res) => {
  res.send({
    status: "success",
    mensaje: "Archivo subido ",
  })
})

module.exports = router
