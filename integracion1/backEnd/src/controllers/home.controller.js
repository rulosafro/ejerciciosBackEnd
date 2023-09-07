const { cartService } = require('../service/index.service')

class HomeController {
  getHome = async (req, res, next) => {
    try {
      const carrito = await cartService.getByID(req.user.cart)
      const itemsInCart = carrito.products.reduce((acc, item) => { return acc + item.quantity }, 0)

      res.status(200).render('home', {
        titulo1: 'Bienvenido',
        info: 'Estas entrando a la mejor tienda de relojeria',
        itemsInCart
      })
    } catch (error) {
      next(error)
    }
  }
}

module.exports = new HomeController()
