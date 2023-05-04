const { Router } = require("express")
const handlebars = require("handlebars")
const { Server } = require("socket.io")

const router = Router()

router.engine("handlebars", handlebars.engine())
router.set("views", __dirname + "/views")
router.set("view engine", "handlebars")

module.exports = router
