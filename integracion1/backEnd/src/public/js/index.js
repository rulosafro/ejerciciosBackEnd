const form = document.querySelector('#cookieForm')
form.addEventListener('submit', (e) => {
  e.preventDefault()
  const data = new FormData(form)
  const obj = {}
  data.forEach((value, key) => (obj[key] = value))

  fetch('/sessions/login', {
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
