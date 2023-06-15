const { userModel } = require("../Daos/mongo/models/user.model")
const { userService, cartService } = require("../service/index.service")
const { createHash, validPassword } = require("../utils/bcryptHash")
const { generateToken } = require("../utils/jwt")

class SessionController {
  getSession = (req, res) => res.send(req.user)

  getCounter = async (req, res) => {
    try {
      if (req.session.counter) {
        req.session.counter++
        res.send(`se ha visitado el sitio ${req.session.counter}`)
      } else {
        req.session.counter = 1
        res.send("bienvenido")
      }
    } catch (error) {
      console.log(error)
    }
  }

  getPrivada = (req, res) => res.send({ status: "success", message: "Todo lo de esta ruta es privado" })
  getCurrent = (req, res) => res.send(req.user)

  getLogin = async (req, res) => {
    try {
      const { email, password } = req.body
      const userDB = await userModel.findOne({ email })
      console.log(userDB)

      if (!userDB) return res.render("login", { status: "error", message: "No existe ese usuario" })

      if (!validPassword(password, userDB))
        return res.status(401).render("login", {
          status: "error",
          message: "Usuario o Contraseña incorrecta",
        })

      req.session.user = {
        first_name: userDB.first_name,
        last_name: userDB.last_name,
        email: userDB.email,
        role: userDB.role,
        id: userDB._id,
        role: userDB.role,
        age: userDB.age,
        cart: userDB.cart,
      }

      const accessToken = generateToken(req.session.user)
      res.cookie("coderCookieToken", accessToken, { maxAge: 60 * 60 * 1000, httpOnly: true }).redirect("/views/products")
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
      const cartShop = await cartService.createCart()
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

      let resultUser = await userService.create(newUser)
      let token = generateToken(newUser)

      res
        .status(200)
        .cookie("coderCookieToken", token, { maxAge: 60 * 60 * 1000, httpOnly: true })
        .redirect("/views/products")
    } catch (error) {
      console.log(error)
    }
  }

  getLogout = (req, res) => {
    try {
      req.session.destroy((err) => {
        if (err) {
          return res.send({ status: "error", error: err })
        }
        res.send("logout ok")
      })
    } catch (error) {
      console.log(error)
    }
  }
}

module.exports = new SessionController()
