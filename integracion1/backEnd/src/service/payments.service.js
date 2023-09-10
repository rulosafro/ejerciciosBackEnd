const Stripe = require('stripe')

class PaymentsService {
  constructor () {
    this.stripe = new Stripe(process.env.STRIPE_SECRET)
  }

  createPaymentIntent = async (data) => {
    const paymentIntent = await this.stripe.checkout.sessions.create(data)
    return JSON.stringify(paymentIntent)
  }
}

module.exports = { PaymentsService }
