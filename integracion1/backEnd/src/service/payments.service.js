const Stripe = require('stripe')

class PaymentsService {
  constructor () {
    this.stripe = new Stripe(process.env.STRIPE_SECRET)
    console.log('🚀 ~ file: payments.service.js:6 ~ PaymentsService ~ constructor ~ process.env.STRIPE_SECRET:', process.env.STRIPE_SECRET)
  }

  createPaymentIntent = async (data) => {
    const paymentIntent = this.stripe.paymentIntents.create(data)
    return paymentIntent
  }
}

module.exports = { PaymentsService }
