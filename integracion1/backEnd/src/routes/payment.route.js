const { Router } = require('express')
const { productService, cartService } = require('../service/index.service')
const { reservationsUrl } = require('twilio/lib/jwt/taskrouter/util')
const { PaymentsService } = require('../service/payments.service')
const { passportCall } = require('../middlewares/passportCall')
const router = Router()

const midJWT = [passportCall('jwt')]

router.post('/:cid', midJWT, async (req, res, next) => {
  try {
    const { cid } = req.params
    const prodReq = await cartService.getByID(cid)
    if (!prodReq) res.status(404).send({ status: '404 Not Found' })

    const data = prodReq.products.map(prod => {
      const item = {
        price_data: {
          product_data: {
            name: prod.product.title
          },
          currency: 'usd',
          unit_amount: prod.product.price * 100
        },
        quantity: prod.quantity
      }
      return item
    })

    const paymentIntentInfo = {
      mode: 'payment',
      line_items: data,
      currency: 'USD',
      success_url: 'http://localhost:8080/views/products',
      cancel_url: 'http://localhost:8080/views/products'
    }

    const service = new PaymentsService()
    const result = await service.createPaymentIntent(paymentIntentInfo)
    const result2 = JSON.parse(result)
    res.status(301).redirect(result2.url)
  } catch (error) {
    next(error)
  }
})

router.get('/success', (req, res) => res.send('success.html'))
router.get('/cancel', (req, res) => res.send('cancel.html'))

module.exports = router
