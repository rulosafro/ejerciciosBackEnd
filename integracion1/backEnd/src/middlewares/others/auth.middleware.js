function auth (req, res, next) {
  req.user ? (user = req.user) : (user = false)
  if (user.role !== 'user' && user.role !== 'admin') {
    return res.status(301).render('login', {
      message: 'Ingresa con tu cuenta para entrar a la tienda',
      style: 'text-warning'
    })
  }
  next()
}

module.exports = {
  auth
}
