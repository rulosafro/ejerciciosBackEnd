console.log("Funcionando el JS")

const form = document.querySelector("#cookieForm")

form.addEventListener("submit", (e) => {
  e.preventDefault()

  const data = new FormData(form)
  const obj = {}
  data.forEach((value, key) => (obj[key] = value))

  fetch("/session/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(obj),
  })
    .then((respuesta) => respuesta.json())
    .then((respuesta) => {
      console.log(respuesta)
      localStorage.setItem("token", respuesta.accessToken)
    })
  // .then((respuesta) => respuesta.JSON.parse())
  // .then((respuesta) => console.log(respuesta))
})

// const getCookie = () => {
//   console.log(document.cookie)
// }
