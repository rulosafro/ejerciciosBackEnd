const fs = require("fs")

class CartManager {
  constructor() {
    this.carts = []
    this.path = "./src/data/carts.json"
  }

  createCart = async () => {
    let contenido = await fs.promises.readFile(this.path, "utf-8")
    const parseData = JSON.parse(contenido)
    const products = []
    try {
      if (parseData.length == 0) {
        parseData.push({ id: 1, products })
        fs.writeFileSync(this.path, JSON.stringify(parseData, null, 2))
      } else {
        parseData.push({ id: parseData[parseData.length - 1].id + 1, products })
        fs.writeFileSync(this.path, JSON.stringify(parseData, null, 2))
      }
      await fs.promises.writeFile(this.path, JSON.stringify(parseData, null, 2))
    } catch (error) {
      return console.log(error)
    }
  }

  getCarts = async () => {
    let contenido = await fs.promises.readFile(this.path, "utf-8")
    const parseData = JSON.parse(contenido)
    try {
      return parseData
    } catch (error) {
      return console.log(error)
    }
  }

  getCartById = async (cid) => {
    try {
      let contenido = await fs.promises.readFile(this.path, "utf-8")
      const parseData = JSON.parse(contenido)
      const productos = parseData.find((prod) => prod.id === cid)
      const items = productos.products
      return items
    } catch (error) {
      return console.log(error)
    }
  }

  addToCart = async (cid, pid, productNew) => {
    try {
      let contenido = await fs.promises.readFile(this.path, "utf-8")
      const parseData = JSON.parse(contenido)
      const carrito = parseData.find((prod) => prod.id === cid)
      const producto = carrito.products.find((prod) => prod.id === pid)



      if (!carrito) {
        return "carrito no encontrado"
      } else {
        if (producto) {
          producto.quantity++
          await fs.promises.writeFile(this.path, JSON.stringify(parseData, null, 2))
          return { producto }
        } else {
          let prodNew = { id: pid, quantity: 1 }
          carrito.products.push(prodNew)
          await fs.promises.writeFile(this.path, JSON.stringify(parseData, null, 2))
          return { prodNew }
        }
      }
    } catch (error) {
      return console.log(error)
    }
  }
}
//----------------------------------------------------------------

const cartManager = new CartManager()

module.exports = { CartManager }
