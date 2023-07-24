const express = require('express')
const app = express()

const { Server: ServerHTTP } = require('http')
const { Server: ServerIO } = require('socket.io')
const { socketMessage } = require('./utils/socketMessage.js')
const { logger } = require('../../config/logger.js')
const serverHttp = ServerHTTP(app)
const io = new ServerIO(serverHttp)

logger.info('chat.js')
logger.info('funcionando el chat.js')

const socket = io()

// socket.emit("message", "hola me estoy comunicando desde un cliente socket")

// socket.on("evento-de-ida", (data) => {
//   logger.info(data)
// })

// socket.on("evt-para-todos", (data) => {
//   logger.info(data)
// })

// socket.on("evento-general", (data) => {
//   logger.info(data)
// })

const input = document.getElementById('text')
const log = document.getElementById('mensajes')

input.addEventListener('keyup', (evt) => {
  if (evt.key === 'Enter') {
    socket.emit('message2', input.value)
    // logger.info(input.value)
    input.value = ''
  }
})

socket.on('log', (data) => {
  let logs = ''
  data.logs.forEach((log) => {
    logs += `<li>${log.socketid} dice: ${log.message}</li>`
  })
  log.innerHTML = logs
})
