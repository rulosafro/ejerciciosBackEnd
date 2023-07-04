class HomeController {
  getHome = async (req, res) => {
    try {
      let data = {
        titulo1: "Bienvenido33",
        info: "Estas entrando a la mejor tienda de relojeria",
      }
      res.render("home", data)
    } catch (error) {
      console.log(error)
    }
  }
}

module.exports = new HomeController()
