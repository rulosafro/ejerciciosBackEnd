const { userModel } = require("../Daos/mongo/models/user.model")
const { cartService } = require("../service/index.service")
const { validPassword, createHash } = require("../utils/bcryptHash")
const { generateToken } = require("../utils/jwt")

class PassportController {
  getLogin = async (req, res) => {
    try {
      const { email, password } = req.body
      const userDB = await userModel.findOne({ email })

      if (!userDB) return res.render("login", { status: "error", message: "No existe ese usuario" })
      if (!validPassword(password, userDB))
        return res.status(401).render("login", {
          status: "error",
          message: "Contraseña incorrecta",
        })

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
      // .send({ status: "success", message: "User Registrado", access_Token })
    } catch (error) {
      console.log(error)
    }
  }

  getRegister = async (req, res) => {
    try {
      const { username, first_name, last_name, email, password, age } = req.body
      const existUser = await userModel.findOne({ email })
      if (existUser)
        return res.send({
          status: "error",
          message: "el email ya está registrado",
        })
      const cartShop = await cartService.create()
      let cartShop_id = cartShop.id

      const newUser = {
        username,
        first_name,
        last_name,
        email,
        age,
        password: createHash(password),
        role: "user",
        cart: cartShop_id,
      }
      let resultUser = await userModel.create(newUser)
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
