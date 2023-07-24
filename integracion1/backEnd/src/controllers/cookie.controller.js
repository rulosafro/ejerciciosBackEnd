class CookieController {
  setCookie = (req, res) => {
    res.cookie('Codercokie', 'Esta es una cookie NO firmada', { maxAge: 10000 }).send('cookieset')
  }

  setSignCookie = (req, res) => {
    res.send(req.cookies)
  }

  // setSignCookie = (req, res) => {
  //   res
  //     .cookie('SignedCookie', 'Esta es una cookie firmada', {
  //       maxAge: 10000,
  //       signed: true
  //     })
  //     .send('cookieset with sign')
  // }

  getSignCookie = (req, res) => {
    res.send(req.signedCookies)
  }

  deleteCookie = (req, res) => {
    res.clearCookie('Codercokie').send('eliminada')
  }

  privateRoute = (req, res) => {
    res.send('Todo lo de acá solo lo puede ver los admins')
  }
}

module.exports = new CookieController()
