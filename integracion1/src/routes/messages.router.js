const express = require("express")
const { Router } = require("express")
const messagesManager = require("../dao/mongo/messages.mongo")
const { Server } = require("socket.io")

const router = Router()

router.get("/", async (req, res) => {
  try {
    const messages = await messagesManager.getMessages()
    // res.status(200).send({
    //   status: "success",
    //   payload: messages,
    // })
    res.render("chat", {})
  } catch (error) {
    console.log(error)
  }
})

router.get("/:mid", async (req, res) => {
  try {
    const { mid } = req.params
    let message = await messagesManager.getMessageByID(mid)
    res.status(200).send({
      status: "success",
      payload: message,
    })
  } catch (error) {
    console.log(error)
  }
})

router.post("/", async (req, res) => {
  try {
    const newMessage = req.body
    let result = await messagesManager.addMessages(newMessage)
    res.status(200).send({
      status: "success",
      payload: result,
    })
  } catch (error) {
    console.log(error)
  }
})

router.put("/:mid", async (req, res) => {
  try {
    const { mid } = req.params
    const cambio = req.body
    const modificado = await messagesManager.upadteMessages(mid, cambio)
    res.status(200).send({
      status: "success",
      payload: modificado,
    })
  } catch (error) {
    console.log(error)
  }
})

router.delete("/:mid", async (req, res) => {
  try {
    const { mid } = req.params
    const quitar = await messagesManager.deleteMessages(mid)
    res.status(200).send({
      status: "success",
      payload: quitar,
    })
  } catch (error) {
    console.log(error)
  }
})

// -----------------------------------------------------

// let messages = []
// // let products = []

// io.on("connection", async (socket) => {
//   console.log("nuevo cliente conectado")
//   let products = await productManager.getProducts()
//   socket.on("message", (data) => {
//     console.log(data)
//     messages.push(data)
//     io.emit("messageLogs", messages)
//   })

//   socket.on("authenticated", (data) => {
//     socket.broadcast.emit("newUserConnected", data)
//   })
//   // let logs = []
//   // socket.on("message1", (data) => {
//   //   io.emit("log", data)
//   // })

//   // socket.on("message2", (data) => {
//   //   logs.push({ socketid: socket.id, message: data })
//   //   io.emit("log", { logs })
//   // })

//   socket.emit("productos", products)

//   socket.on("addProduct", (data) => {
//     console.log(data)
//     products.push(data)
//   })
// })

module.exports = router
