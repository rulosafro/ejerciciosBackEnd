console.log("funcionando chat.js")
const socket = io()

let user
let chatbox = document.getElementById("chatbox")

Swal.fire({
  title: "Ingresa tu Usuario",
  input: "text",
  text: "Ingresa tu Usuario",
  inputValidator: (value) => {
    return !value && "El nombre de usuario es necesario para continuar"
  },
  allowOutsideClick: false,
  allowEscapeKey: false,
}).then((result) => {
  user = result.value
  socket.emit("authenticated", user)
})

chatbox.addEventListener("keyup", (evt) => {
  if (evt.key === "Enter") {
    if (chatbox.value.trim().length > 0) {
      socket.emit("message", {
        user,
        message: chatbox.value,
      })
      chatbox.value = ""
    }
  }
})

socket.on("messageLogs", (data) => {
  let log = document.getElementById("messageLogs")
  let mensajes = ""
  data.forEach(({ user, message }) => {
    mensajes += `<li>${user} dice: ${message}</li>`
  })
  console.log(log)
  log.innerHTML = mensajes
})

socket.on("newUserConnected", (user) => {
  if (!user) {
    return
  }

  Swal.fire({
    toast: true,
    position: "top-right",
    showConfirmButton: false,
    timer: 10000,
    title: `${user} se a unido al chat`,
    icon: "success",
  })
})
