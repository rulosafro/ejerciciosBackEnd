const { Router } = require("express")
const router = Router()

router.get("/", (req, res) => {
  res.status(200).send("Bienvenidos a usuarios")
})

module.exports = router
