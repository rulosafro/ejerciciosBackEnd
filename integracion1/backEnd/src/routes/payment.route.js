const { Router } = require('express')
const { productService } = require('../service/index.service')
const { reservationsUrl } = require('twilio/lib/jwt/taskrouter/util')
const { PaymentsService } = require('../service/payments.service')
const router = Router()

router.post('/', async (req, res) => {
  try {
    const prodReq = await productService.get()
    if (!prodReq) res.status(404).send({ status: '404 Not Found' })

    const paymentIntentInfo = {
      amount: prodReq,
      currency: 'USD',
      metadata: {
        userId: 'idmongo',
        orderDetails: JSON.stringify({
          [prodReq.name]: 2
        }, null, '\t'),
        address: JSON.stringify({
          street: 'callesiempreviva',
          postalCode: '12345',
          externalNumber: '987545'
        }, null, '\t')
      }
    }

    const service = new PaymentsService()
    const result = await service.createPaymentIntent(paymentIntentInfo)

    res.send({
      status: 'success',
      payload: result
    })
  } catch (error) {
    console.log(error)
  }
})

module.exports = router
