const { logger } = require('../../config/logger')

const form = document.querySelector('#cookieForm')

form.addEventListener('submit', (e) => {
  e.preventDefault()

  const data = new FormData(form)
  const obj = []
  data.forEach((value, key) => {
    obj[key] = value
  })

  fetch('/pruebas/session', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(obj)
  })
    .then((respuesta) => respuesta.JSON.parse())
    .then((respuesta) => logger.info(respuesta))
})

const getCookie = () => {
  logger.info(document.cookie)
}
