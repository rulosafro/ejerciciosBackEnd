const { Router } = require("express")
const { userModel } = require("../dao/mongo/models/user.model")
const { auth } = require("../middlewares/autentication.middleware")
const { createHash, validPassword } = require("../utils/bcryptHash")
const passport = require("passport")
const { generateToken } = require("../utils/jwt")
const passportCall = require("../passport-jwt/passportCall")
const { authorization } = require("../passport-jwt/authorizationJwtRole")
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

// viene corrupto
// viene o no
router.get("/current", passportCall("jwt"), authorization("admin"), (req, res) => {
  res.send(req.user)
})

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body
    // const userDB = await userModel.findOne({ email })

    // if (!userDB) return res.send({ status: "error", message: "No existe ese usuario" })

    // if (!validPassword(password, userDB))
    //   return res.status(401).send({
    //     status: "error",
    //     message: "Usuario o Contraseña incorrecta",
    //   })

    // req.session.user = {
    //   first_name: userDB.first_name,
    //   last_name: userDB.last_name,
    //   email: userDB.email,
    //   role: userDB.role,
    //   id: userDB._id,
    // }

    const accessToken = generateToken({
      first_name: "javi",
      last_name: "javi",
      email: "javi@a.com",
      role: "user",
    })

    // res.redirect("/views/products").send(req.session.user)
    res.cookie("coderCookieToken", accessToken, { maxAge: 60 * 60 * 1000, httpOnly: true }).send({ status: "success", message: "login exitoso", accessToken })
  } catch (error) {
    console.log(error)
  }
})

router.post("/register", async (req, res) => {
  try {
    const { username, first_name, last_name, email, password } = req.body
    // const existUser = await userModel.findOne({ email })
    // if (existUser)
    //   return res.send({
    //     status: "error",
    //     message: "el email ya está registrado",
    //   })

    // const newUser = {
    //   username,
    //   first_name,
    //   last_name,
    //   email,
    //   password: createHash(password),
    //   role: "user",
    // }
    // let resultUser = await userModel.create(newUser)

    let token = generateToken({ first_name: "javi", last_name: "javi", email: "javi@a.com" })

    res.status(200).send({ status: "success", message: "register exitoso", token })
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

// //? Passport

// router.post(
//   "/login2",
//   passport.authenticate("login", {
//     // successRedirect: "/views/products",
//     failureRedirect: "/faillogin",
//     // failureFlash: true,
//   }),
//   async (req, res) => {
//     if (!req.user) {
//       return res.status(401).send({ status: "error", message: "Credencial invalida" })
//     }

//     req.session.user = {
//       first_name: req.user.first_name,
//       last_name: req.user.last_name,
//       email: req.user.email,
//       role: req.user.role,
//     }

//     res.send({ status: "success", message: "User Registrado" })
//   }
// )

// router.get("/faillogin", (req, res) => {
//   console.log("Fallo el login")
//   res.send({ status: "error", message: "Estrategia invalida" })
// })

// router.post(
//   "/register2",
//   passport.authenticate("register", {
//     // successRedirect: "/views/products",
//     failureRedirect: "/failregister",
//     // failureFlash: true,
//   }),
//   async (req, res) => {
//     res.send({ status: "success", message: "User Register" })
//   }
// )

// router.get("/failregister", (req, res) => {
//   console.log("Fallo el login")
//   res.send({ status: "error", message: "Autentificación invalida" })
// })

//? Github

router.get("/github", passport.authenticate("github", { scope: ["user:email"] }), () => {})
router.get("/githubcallback", passport.authenticate("github", { failureRedirect: "/views/login" }), async (req, res) => {
  req.session.user = req.user
  res.redirect("/views/products")
})

router.post(
  "/login3",
  passport.authenticate("login", {
    // successRedirect: "/views/products",
    failureRedirect: "/faillogin",
    // failureFlash: true,
  }),
  async (req, res) => {
    if (!req.user) {
      return res.status(401).send({ status: "error", message: "Credencial invalida" })
    }

    req.session.user = {
      first_name: req.user.first_name,
      last_name: req.user.last_name,
      email: req.user.email,
      role: req.user.role,
    }

    res.send({ status: "success", message: "User Registrado" })
  }
)

router.get("/faillogin3", (req, res) => {
  console.log("Fallo el login")
  res.send({ status: "error", message: "Estrategia invalida" })
})

router.post(
  "/register3",
  passport.authenticate("register", {
    // successRedirect: "/views/products",
    failureRedirect: "/failregister",
    // failureFlash: true,
  }),
  async (req, res) => {
    res.send({ status: "success", message: "User Register" })
  }
)

router.get("/failregister3", (req, res) => {
  console.log("Fallo el login")
  res.send({ status: "error", message: "Autentificación invalida" })
})

module.exports = router
