const socket = io()
const productManager = require("../../Daos/mongo/product.mongo")

socket.on("productos", async (data) => {
  console.log(data)

  const products = await productManager.getProducts()
  let div = document.getElementById("listProducts")
  let productos = products
  data.forEach((product) => {
    productos += `    <div class="card" style="width: 18rem;">
    <h1>${product.title} </h1>
    <img src="${product.thumbnail[0].url}" class="card-img-top" alt="...">
    <div class="card-body">
      <p class="card-text">$${product.price}</p>
      <p class="card-text">${product.description}</p>
    </div>
  </div>`
  })
  div.innerHTML = productos
})
