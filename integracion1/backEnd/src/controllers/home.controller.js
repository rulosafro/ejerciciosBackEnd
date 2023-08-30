class HomeController {
  getHome = async (req, res, next) => {
    try {
      const data = {
        titulo1: 'Bienvenido',
        info: 'Estas entrando a la mejor tienda de relojeria'
      }
      res.render('home', data)
    } catch (error) {
      next(error)
    }
  }
}

module.exports = new HomeController()
