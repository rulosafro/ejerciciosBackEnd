const { Router } = require('express')
const { generateProduct } = require('../utils/generateProducts')
const { productModel } = require('../Daos/mongo/models/product.model')
const router = Router()

router.get('/', async (req, res) => {
  const products = []
  for (let i = 0; i < 100; i++) {
    products.push(generateProduct())
  }
  // productModel.insertMany(products)
  res.send({
    status: 'success',
    payload: products
  })
})

module.exports = router
