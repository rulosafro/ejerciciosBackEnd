const authorization = (role) => {
  return async (req, res, next) => {
    if (!req.user) res.status(401).render('login', { status: 'error', message: 'Debes ingresar para acceder a la web', style: 'text-danger' })
    if (role === 'user' && req.user.role === 'admin') res.status(403).render('login', { status: 'error', message: 'Esta es una página para usuarios, ingresa con una cuenta regular', style: 'text-warning' })
    if (req.user.role !== role && req.user.role !== 'admin') res.status(403).render('login', { status: 'error', message: 'Se necesita un permiso de Admin para acceder', style: 'text-warning' })
    next()
  }
}

module.exports = {
  authorization
}

//    Necesitas permiso de Administrador
