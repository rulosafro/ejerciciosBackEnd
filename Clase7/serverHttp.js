const http = require("http")

const server = http.createServer((req, res) => {
  res.end("Hello World!, agaunte el bulla aaaaaaaa")
})

server.listen(8000, () => {
  console.log("Escuchando el servidor y que pasa")
})
