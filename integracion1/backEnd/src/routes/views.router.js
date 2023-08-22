const { Router } = require('express')
const { uploader } = require('../utils/multer')
const { passportCall } = require('../middlewares/passportCall')
const { authorization } = require('../middlewares/authorizationJwtRole')
const { viewsUsers, viewsProducts, viewsRealTime, viewsCarts, viewsMyCart, viewsLogin, viewsRegister, viewsLogout, viewsUpload, formData } = require('../controllers/views.controller')

const midUser = [passportCall('jwt'), authorization('user')]
const midAdmin = [passportCall('jwt'), authorization('admin')]
// const midUser = []
// const midAdmin = []

const router = Router()

router.get('/users', midAdmin, viewsUsers)
router.get('/products', midUser, viewsProducts)
router.get('/realtime', midUser, viewsRealTime)
router.get('/carts', midUser, viewsCarts)
// router.get('/carts/:cid', midUser, viewsMyCart)
router.get('/mycart', midUser, viewsMyCart)
router.get('/register', viewsRegister)
router.get('/login', viewsLogin)
router.get('/logout', viewsLogout)
router.get('/formdata', midUser, formData)

router.post('/upload', midUser, uploader.single('myFile'), viewsUpload)

// router.get("/*", async (req, res) => {
//   res.status(404).render("errorPage")
// })

module.exports = router
