const { logger } = require('../config/logger')

class HomeController {
  getHome = async (req, res) => {
    try {
      const data = {
        titulo1: 'Bienvenido33',
        info: 'Estas entrando a la mejor tienda de relojeria'
      }
      res.render('home', data)
    } catch (error) {
      logger.error(error)
    }
  }
}

module.exports = new HomeController()
