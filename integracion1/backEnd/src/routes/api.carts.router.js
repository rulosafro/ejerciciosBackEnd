const { Router } = require('express')
const { getCarts, getCartsById, createCarts, updateCarts, deleteCart, deleteProductOnCart, putProductOnCarts, getMyCart, putProductOnMyCart, putProductOnCartsQuantity, putProductOnMyCartQuan, deleteProductOnMyCart } = require('../controllers/carts.controller')
const { purchaseTicket } = require('../controllers/tickets.controller')
const { passportCall } = require('../middlewares/passportCall')
const { authorization } = require('../middlewares/authorizationJwtRole')

const router = Router()

const midUser = [passportCall('jwt'), authorization('user')]
const midAdmin = [passportCall('jwt'), authorization('admin')]
// const midUser = []
// const midAdmin = []

router.get('/', midAdmin, getCarts) //
router.get('/:cid', midAdmin, getCartsById) //
router.get('/mycart', midUser, getMyCart)

router.post('/', midUser, createCarts) //
router.post('/:tid/purchase', midUser, purchaseTicket)

router.put('/:cid', midAdmin, updateCarts) //
router.put('/:cid/product/:pid', midUser, putProductOnCarts) //
router.put('/:cid/product/:pid/quantity/:num', midAdmin, putProductOnCartsQuantity)
router.put('/mycart/product/:pid', midUser, putProductOnMyCart)
router.put('/mycart/myproduct/:pid/quantity/:num', midUser, putProductOnMyCartQuan)

router.delete('/:cid', midAdmin, deleteCart) //
router.delete('/:cid/product/:pid', midUser, deleteProductOnCart) //
router.delete('/mycart/myproduct/:pid', midUser, deleteProductOnMyCart) //

module.exports = router
