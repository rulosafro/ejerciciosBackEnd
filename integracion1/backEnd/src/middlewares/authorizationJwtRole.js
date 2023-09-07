const authorization = (role) => {
  return async (req, res, next) => {
    if (!req.user) res.status(401).render('login', { status: 'error', message: 'Debes ingresar para acceder a la web', style: 'text-danger' })

    if (role === 'user' && req.user.role === 'user') { next() }
    if (role === 'user' && req.user.role === 'premium') { next() }
    if (role === 'admin' && req.user.role === 'admin') { next() }

    if (role === 'user' && req.user.role === 'admin') res.status(403).render('login', { status: 'error', message: 'Esta es una página para usuarios, ingresa con una cuenta regular ', style: 'text-warning', linkRef: '/views/users', linkName: 'Ir a vista de Administrador/a', linkStyle: 'text-white' })

    if (role === 'admin' && req.user.role !== 'admin') res.status(403).render('login', { status: 'error', message: 'Esta es una página para administradores, ingresa con una cuenta de admin', style: 'text-warning', linkRef: '/views/products', linkName: 'Volver al catálogo', linkStyle: 'text-white' })
  }
}

module.exports = {
  authorization
}
