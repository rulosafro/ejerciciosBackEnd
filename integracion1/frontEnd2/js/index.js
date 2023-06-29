console.log("Funcionanding")

fetch("http://localhost:8080/api/products", {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },

  // body: {

  // }
})
  .then((respuesta) => respuesta.json())
  .then((respuesta) => {
    console.log(respuesta.payload)
    let html = ""
    const productList = document.querySelector("#productList")
    respuesta.payload.map((product) => {
      return (html += `
      <div class='card w-25'>
        <div clas='card-header'> 
          ${product.title}
        </div>
      </div>
      `)
    })
    productList.innerHTML = html
  })
  .catch((err) => console.log(err))
