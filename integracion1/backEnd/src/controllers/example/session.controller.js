// const { logger } = require('../../config/logger')

// class SessionController {
//   getSession = (req, res) => res.send(req.user)
//   getPrivada = (req, res) => res.send({ status: 'success', message: 'Todo lo de esta ruta es privado' })
//   getCurrent = (req, res) => res.send(req.user)

//   getCounter = async (req, res) => {
//     try {
//       if (req.session.counter) {
//         req.session.counter++
//         res.send(`se ha visitado el sitio ${req.session.counter}`)
//       } else {
//         req.session.counter = 1
//         res.send('bienvenido')
//       }
//     } catch (error) {
//       logger.error(error)
//     }
//   }

// getLogout = (req, res) => {
//   try {
//     req.session.destroy((err) => {
//       if (err) {
//         return res.send({ status: 'error', error: err })
//       }
//       res
//         .clearCookie('coderCookieToken')
//         .clearCookie('connect.sid')
//         .redirect('/views/products')
//       // res.send('logout ok')
//     })
//   } catch (error) {
//     logger.error(error)
//   }
// }

// getLogin = async (req, res, next) => {
//   try {
//     const { email, password } = req.body

//     if (!email || !password) {
//       CustomError.createError({
//         name: 'User login fail',
//         cause: generateLoginErrorInfo({
//           email,password
//         }),
//         message: 'Error trying to login',
//         code: EError.INVALID_TYPE_ERROR
//       })
//     }

//     const userDB = await userModel.findOne({ email })
//     logger.info(userDB)

//     if (!userDB) return res.render("login", { status: "error", message: "No existe ese usuario" })

//     if (!validPassword(password, userDB))
//       return res.status(401).render("login", {
//         status: "error",
//         message: "Usuario o Contraseña incorrecta",
//       })

//     req.user = {
//       first_name: userDB.first_name,
//       last_name: userDB.last_name,
//       email: userDB.email,
//       role: userDB.role,
//       id: userDB._id,
//       role: userDB.role,
//       age: userDB.age,
//       cart: userDB.cart,
//     }

//     const accessToken = generateToken(req.user)
//     res
//       .cookie("coderCookieToken", accessToken, { maxAge: 60 * 60 * 1000, httpOnly: true })
//       // .send({ status:'success', message: 'Ingreso Correcto', token: accessToken })
//       .redirect("/views/products")
//   } catch (error) {
//     next(error)
//   }
// }

// getRegister = async (req, res, next) => {
//   try {
//     const { nickname, first_name, last_name, email, password, age } = req.body

//     if (!nickname || !first_name || !last_name || !email || !password || !age) {
//       CustomError.createError({
//         name: 'User login fail',
//         cause: generateRegisterErrorInfo({
//           nickname, first_name, last_name, email, password, age
//         }),
//         message: 'Error trying to login',
//         code: EError.INVALID_TYPE_ERROR
//       })
//     }

//     const existUser = await userModel.findOne({ email })
//     if (existUser)
//       return res.send({
//         status: "error",
//         message: "el email ya está registrado",
//       })
//     // const cartShop = await cartService.create()
//     // let cartShop_id = cartShop.id

//     const newUser = {
//       nickname,
//       first_name,
//       last_name,
//       email,
//       age,
//       password: createHash(password),
//       role: "user",
//       // cart: cartShop_id,
//     }
//     // logger.info("🚀 ~ file: session.controller.js:112 ~ SessionController ~ getRegister= ~ newUser:", newUser)

//     // let resultUser = await userService.create(newUser)
//     let token = generateToken(newUser)

//     res
//       .status(200)
//       .cookie("coderCookieToken", token, { maxAge: 60 * 60 * 1000, httpOnly: true })
//       .redirect("/views/products")
//   } catch (error) {
//     next(error)
//   }
// }
// }

module.exports = new SessionController()
