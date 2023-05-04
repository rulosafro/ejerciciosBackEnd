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
  res.render("home", {})
})

router.use("/productos", productsRouter)
router.use("/usuarios", usuariosRouter)
router.use("/carts", cartsRouter)
router.use("/realtimeproducts", realtimeRouter)
router.use("/chat", messagesRouter)
router.use("/register", registerRouter)
router.use("/static", express.static(__dirname + "./../public"))

// Método POST /static
router.post("/upload", uploader.single("myFile"), (req, res) => {
  res.send({
    status: "success",
    mensaje: "Archivo subido ",
  })
})

module.exports = router
