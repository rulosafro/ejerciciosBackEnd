const { Router } = require('express')
const { getCarts, getCartsById, createCarts, updateCarts, deleteCart, deleteProductOnCart, putProductOnCarts, getMyCart, putProductOnMyCart, putProductOnCartsQuantity } = require('../controllers/carts.controller')
const { purchaseTicket } = require('../controllers/tickets.controller')

const router = Router()

router.get('/', getCarts)
router.get('/:cid', getCartsById)

router.post('/', createCarts)
router.post('/:cid/product/:pid', putProductOnCarts)
router.post('/:cid/product/:pid/quantity/:num', putProductOnCartsQuantity)

router.post('/mycart/product/:pid', putProductOnMyCart)
router.post('/:tid/purchase', purchaseTicket)

router.put('/:cid', updateCarts)

router.delete('/:cid', deleteCart)
router.delete('/:cid/product/pid', deleteProductOnCart)

module.exports = router
