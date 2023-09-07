const { Router } = require('express')
const { uploader } = require('../utils/multer')
const { passportCall } = require('../middlewares/passportCall')
const { authorization } = require('../middlewares/authorizationJwtRole')
const { viewsUsers, viewsProducts, viewsRealTime, viewsCarts, viewsLogin, viewsRegister, viewsLogout, viewsUpload, formData, changeRoles, viewMyCart, viewsProductDetail, viewCheckout, viewCheckoutTicket, viewsProductCreate } = require('../controllers/views.controller')

const midUser = [passportCall('jwt'), authorization('user')]
const midAdmin = [passportCall('jwt'), authorization('admin')]
// const midUser = []
// const midAdmin = []

const router = Router()

router.get('/products', midUser, viewsProducts)
router.get('/products/:pid', midUser, viewsProductDetail)
router.get('/product/create', midUser, viewsProductCreate)
router.get('/users', midAdmin, changeRoles)
router.get('/formdata', midUser, formData)
router.get('/mycart', midUser, viewMyCart)
router.get('/checkout/:cid', midUser, viewCheckout)
router.get('/checkout/ticket/:cid', midUser, viewCheckoutTicket)
router.get('/register', viewsRegister)
router.get('/login', viewsLogin)
router.get('/logout', viewsLogout)

router.get('/carts', midAdmin, viewsCarts)
router.post('/upload', midUser, uploader.single('myFile'), viewsUpload)
// router.get('/realtime', midUser, viewsRealTime)
// router.get('/carts/:cid', midUser, viewsMyCart)
// router.get('/users', midAdmin, viewsUsers)
// router.get('/*', async (req, res) => {
//   res.status(404).render('errorPage')
// })

module.exports = router
