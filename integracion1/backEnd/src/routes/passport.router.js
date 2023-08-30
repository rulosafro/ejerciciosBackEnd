const { Router } = require('express')
const { getLogin, getRegister, failLogin, failRegister, getLoginSwagger, getRegisterSwagger } = require('../controllers/passport.controller')
const { passportCall } = require('../middlewares/passportCall')

const router = Router()

router.post('/register', passportCall('register', { session: false }), getRegister)
router.post('/login', passportCall('login', { session: false }), getLogin)
router.get('/faillogin', failLogin)
router.get('/failregister', failRegister)

// Duplicas de routeo para facilitar el swagger en el login de admin o user
router.post('/swagger/register', passportCall('register', { session: false }), getRegisterSwagger)
router.post('/swagger/login', passportCall('login', { session: false }), getLoginSwagger)
router.post('/swagger/login2', passportCall('login', { session: false }), getLoginSwagger)

module.exports = router
