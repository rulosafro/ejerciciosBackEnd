const express = require('express')
const app = express()
const { Server: ServerIO } = require('socket.io')
const { Server: ServerHTTP } = require('http')
const { productService } = require('../service/index.service')
const { logger } = require('../config/logger')

const serverHttp = ServerHTTP(app)
const io = new ServerIO(serverHttp)

exports.socketMessage = () => {
  const messages = []

  io.on('connection', async (socket) => {
    socket.on('message', (data) => {
      logger.info(data)
      messages.push(data)
      io.emit('messageLogs', messages)
    })

    socket.on('authenticated', (data) => {
      socket.broadcast.emit('newUserConnected', data)
    })

    // Product
    const products = await productService.get()
    // let products = await ProductManagerMongo.getProducts()

    socket.emit('productos', products)

    socket.on('addProduct', (data) => {
      logger.info(data)
      products.push(data)
    })
  })
}
