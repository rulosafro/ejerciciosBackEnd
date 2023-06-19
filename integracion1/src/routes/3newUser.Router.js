const RouterClass = require("./2RouterClass")

class UserRouter extends RouterClass {
  init() {
    this.get("/", ["PUBLIC"], async (req, res) => {
      try {
        res.sendSuccess("Hola papiter")
      } catch (error) {
        res.sendServerError(error)
      }
    })

    this.get("/current", ["ADMIN"], async (req, res) => {
      try {
        res.sendSuccess("Validando")
      } catch (error) {
        res.sendServerError(error)
      }
    })
  }
}

module.exports = UserRouter
