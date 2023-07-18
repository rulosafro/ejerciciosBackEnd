const { logger } = require('../../config/logger')

logger.info('Funcionando el JS')

const form = document.querySelector('#cookieForm')
form.addEventListener('submit', (e) => {
  e.preventDefault()
  const data = new FormData(form)
  const obj = {}
  data.forEach((value, key) => (obj[key] = value))

  fetch('/session/passport/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
      // authorization: "Bearer",
    },
    body: JSON.stringify(obj)
  })
    .then((respuesta) => respuesta.json())
    .then((respuesta) => {
      logger.info(respuesta)
      localStorage.setItem('token', respuesta.accessToken)
    })
})
