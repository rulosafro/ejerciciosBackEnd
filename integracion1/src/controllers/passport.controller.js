const { userModel } = require("../Daos/mongo/models/user.model")
const { cartService } = require("../service/index.service")
const { validPassword, createHash } = require("../utils/bcryptHash")
const { generateToken } = require("../utils/jwt")
const passportCall = require("../middlewares/passportCall")

class PassportController {
  getLogin = async (req, res) => {
    try {
      const userDB = req.user
      const access_Token = generateToken({
        first_name: userDB.first_name,
        last_name: userDB.last_name,
        email: userDB.email,
        role: userDB.role,
        id: userDB._id,
        age: userDB.age,
        cart: userDB.cart,
      })

      res
        .cookie("coderCookieToken", access_Token, {
          maxAge: 60 * 60 * 100,
          httpOnly: true,
        })
        .redirect("/views/products")
    } catch (error) {
      console.log(error)
    }
  }

  getRegister = async (req, res) => {
    try {
      const newUser = req.user
      let token = generateToken(newUser)

      res
        .status(200)
        .cookie("coderCookieToken", token, { maxAge: 60 * 60 * 1000, httpOnly: true })
        .redirect("/views/products")
    } catch (error) {
      console.log(error)
    }
  }

  failLogin = (req, res) => {
    console.log("Fallo el login")
    res.send({ status: "error", message: "Estrategia invalida" })
  }

  failRegister = (req, res) => {
    console.log("Fallo el login")
    res.send({ status: "error", message: "Autentificación invalida" })
  }
}

module.exports = new PassportController()
