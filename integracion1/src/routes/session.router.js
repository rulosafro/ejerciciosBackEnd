const { Router } = require("express")
const { userModel } = require("../dao/mongo/models/user.model")
const { createHash, validPassword } = require("../utils/bcryptHash")
const passport = require("passport")
const { generateToken } = require("../utils/jwt")
const passportCall = require("../passport-jwt/passportCall")
const { auth } = require("../middlewares/autentication.middleware")
const { authorization } = require("../passport-jwt/authorizationJwtRole")
const githubRouter = require("./github.router")
const passportRouter = require("./passport.router")
const { cartsModel } = require("../dao/mongo/models/carts.model")
const cartsMongo = require("../dao/mongo/carts.mongo")

const router = Router()

router.use("/github", githubRouter)
router.use("/passport", passportRouter)

router.get("/counter", (req, res) => {
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
})

router.get("/privada", passportCall("jwt"), authorization("admin"), (req, res) => {
  res.send({ status: "success", message: "Todo lo de esta ruta es privado" })
})

router.get("/current", passportCall("jwt"), authorization("admin"), (req, res) => {
  res.send(req.user)
})

router.post("/login", async (req, res) => {
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

    // req.session.user = {
    //   first_name: userDB.first_name,
    //   last_name: userDB.last_name,
    //   email: userDB.email,
    //   role: userDB.role,
    //   id: userDB._id,
    // }

    // const user = {
    //   first_name: "javi",
    //   last_name: "javi",
    //   email: "javi@a.com",
    //   role: "user",
    // }

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
    console.log({ "Puede ser acá": req.session.user })
    res.cookie("coderCookieToken", accessToken, { maxAge: 60 * 60 * 1000, httpOnly: true }).redirect("/views/products")
  } catch (error) {
    console.log(error)
  }
})

router.post("/register", async (req, res) => {
  try {
    const { username, first_name, last_name, email, password, age } = req.body
    const existUser = await userModel.findOne({ email })
    if (existUser)
      return res.send({
        status: "error",
        message: "el email ya está registrado",
      })
    const cartShop = await cartsMongo.createCart()
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
})

router.get("/logout", (req, res) => {
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
})

module.exports = router
