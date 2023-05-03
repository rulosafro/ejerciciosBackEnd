console.log("chat.js")
console.log("funcionando el chat.js")

const socket = io()

// socket.emit("message", "hola me estoy comunicando desde un cliente socket")

// socket.on("evento-de-ida", (data) => {
//   console.log(data)
// })

// socket.on("evt-para-todos", (data) => {
//   console.log(data)
// })

// socket.on("evento-general", (data) => {
//   console.log(data)
// })

const input = document.getElementById("text")
const log = document.getElementById("mensajes")

input.addEventListener("keyup", (evt) => {
  if (evt.key === "Enter") {
    socket.emit("message2", input.value)
    // console.log(input.value)
    input.value = ""
  }
})

socket.on("log", (data) => {
  let logs = ""
  data.logs.forEach((log) => {
    logs += `<li>${log.socketid} dice: ${log.message}</li>`
  })
  log.innerHTML = logs
})
