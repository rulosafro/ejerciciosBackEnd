const express = require("express")
const routerServer = require("./routes/index.js")
const { connectDB } = require("./config/configServer")
const logger = require("morgan")

const app = express()
const PORT = 8080
connectDB()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(logger("dev"))
app.use("/static", express.static(__dirname + "/public"))

app.use(routerServer)

app.listen(PORT, (err) => {
  if (err) console.log("error en el servidor", err)
  console.log(`Escuchanding port: ${PORT}`)
})
