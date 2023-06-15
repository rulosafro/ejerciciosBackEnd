console.log("Funcionando el JS")

const form = document.querySelector("#cookieForm")
form.addEventListener("submit", (e) => {
  e.preventDefault()
  const data = new FormData(form)
  const obj = {}
  data.forEach((value, key) => (obj[key] = value))

  fetch("/session/passport/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // authorization: "Bearer",
    },
    body: JSON.stringify(obj),
  })
    .then((respuesta) => respuesta.json())
    .then((respuesta) => {
      console.log(respuesta)
      localStorage.setItem("token", respuesta.accessToken)
    })
})
