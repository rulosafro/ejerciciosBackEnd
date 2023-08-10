const { Router } = require('express')
const { getProducts, getProductsById, createProducts, updateProducts, deleteProducts } = require('../controllers/products.controller.js')
const { passportCall } = require('../middlewares/passportCall.js')
const { authorization } = require('../middlewares/authorizationJwtRole.js')

const router = Router()

const midAdmin = [passportCall('jwt'), authorization('admin')]

router.get('/', getProducts)
router.get('/:pid', getProductsById)

router.post('/', createProducts)

router.put('/:pid', midAdmin, updateProducts)

router.delete('/:pid', midAdmin, deleteProducts)

module.exports = router
