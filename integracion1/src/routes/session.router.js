const { Router } = require("express")
const { userModel } = require("../dao/mongo/models/user.model")
const { auth } = require("../middlewares/autentication.middleware")
const { createHash, validPassword } = require("../utils/bcryptHash")
const passport = require("passport")
const { log } = require("handlebars")
const router = Router()

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

router.get("/privada", auth, (req, res) => {
  res.send({ status: "success", message: "Todo lo de esta ruta es privado" })
})

// router.post("/login2", async (req, res) => {
//   try {
//     const { email, password } = req.body
//     const userDB = await userModel.findOne({ email })

//     if (!userDB)
//       return res.send({ status: "error", message: "No existe ese usuario" })

//     if (!validPassword(password, userDB))
//       return res.status(401).send({
//         status: "error",
//         message: "Usuario o Contraseña incorrecta",
//       })

//     req.session.user = {
//       first_name: userDB.first_name,
//       last_name: userDB.last_name,
//       email: userDB.email,
//       role: "admin",
//     }

//     res.send({
//       status: "success",
//       message: "login success",
//       session: req.session.user,
//     })
//   } catch (error) {
//     console.log(error)
//   }
// })

// router.post("/register2", async (req, res) => {
//   try {
//     const { username, first_name, last_name, email, password } = req.body
//     const existUser = await userModel.findOne({ email })
//     if (existUser)
//       return res.send({
//         status: "error",
//         message: "el email ya está registrado",
//       })

//     const newUser = {
//       username,
//       first_name,
//       last_name,
//       email,
//       password: createHash(password),
//     }
//     let resultUser = await userModel.create(newUser)

//     res
//       .status(200)
//       .send({ status: "success", message: "register exitoso", resultUser })
//   } catch (error) {
//     console.log(error)
//   }
// })

router.post(
  "/login",
  passport.authenticate("login", {
    // successRedirect: "/views/products",
    failureRedirect: "/faillogin",
    // failureFlash: true,
  }),
  async (req, res) => {
    if (!req.user) {
      return res
        .status(401)
        .send({ status: "error", message: "Credencial invalida" })
    }

    req.session.user = {
      first_name: req.user.first_name,
      last_name: req.user.last_name,
      email: req.user.email,
      role: req.user.role,
    }

    res.send({ status: "success", message: "User Register" })
  }
)

router.get("/faillogin", (req, res) => {
  console.log("Fallo el login")
  res.send({ status: "error", message: "Estrategia invalida" })
})

router.post(
  "/register",
  passport.authenticate("register", {
    // successRedirect: "/views/products",
    failureRedirect: "/failregister",
    // failureFlash: true,
  }),
  async (req, res) => {
    res.send({ status: "success", message: "User Register" })
  }
)

router.get("/failregister", (req, res) => {
  console.log("Fallo el login")
  res.send({ status: "error", message: "Autentificación invalida" })
})

// router.post("/registerFailer",{})

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
