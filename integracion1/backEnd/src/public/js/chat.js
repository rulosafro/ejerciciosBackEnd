const express = require('express')
const app = express()

const { Server: ServerHTTP } = require('http')
const { Server: ServerIO } = require('socket.io')
const { socketMessage } = require('./utils/socketMessage.js')
const { logger } = require('../../config/logger.js')
const serverHttp = ServerHTTP(app)
const io = new ServerIO(serverHttp)

logger.info('funcionando chat.js')
const socket = io()

let user
const chatbox = document.getElementById('chatbox')

Swal.fire({
  title: 'Ingresa tu Usuario',
  input: 'text',
  text: 'Ingresa tu Usuario',
  inputValidator: (value) => {
    return !value && 'El nombre de usuario es necesario para continuar'
  },
  allowOutsideClick: false,
  allowEscapeKey: false
}).then((result) => {
  user = result.value
  socket.emit('authenticated', user)
})

chatbox.addEventListener('keyup', (evt) => {
  if (evt.key === 'Enter') {
    if (chatbox.value.trim().length > 0) {
      socket.emit('message', {
        user,
        message: chatbox.value
      })
      chatbox.value = ''
    }
  }
})

socket.on('messageLogs', (data) => {
  const log = document.getElementById('messageLogs')
  let mensajes = ''
  data.forEach(({ user, message }) => {
    mensajes += `<li>${user} dice: ${message}</li>`
  })
  logger.info(log)
  log.innerHTML = mensajes
})

socket.on('newUserConnected', (user) => {
  if (!user) {
    return
  }

  Swal.fire({
    toast: true,
    position: 'top-right',
    showConfirmButton: false,
    timer: 10000,
    title: `${user} se a unido al chat`,
    icon: 'success'
  })
})
