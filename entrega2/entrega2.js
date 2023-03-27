const fs = require("fs")

class ProductManager {
  constructor() {
    this.products = []
    this.path = "./catalogo.json"
  }

  // Debe contar con un método “addProduct” el cual agregará un producto al arreglo de productos inicial. - Validar que no se repita el campo “code” y que todos los campos sean obligatorios -  Al agregarlo, debe crearse con un id autoincrementable
  addProduct = (newProduct) => {
    if (!newProduct.title || !newProduct.description || !newProduct.price || !newProduct.thumbnail || !newProduct.code || !newProduct.stock) {
      return "Es necesario rellenar todos los campos"
    }

    let product = this.products.find((prod) => prod.code == newProduct.code)
    if (product) return "Es necesario modificar el campo code"

    if (this.products.length == 0) {
      this.products.push({ id: 1, ...newProduct })
      fs.writeFileSync(this.path, JSON.stringify(this.products, null, 2))
    } else {
      this.products.push({ id: this.products[this.products.length - 1].id + 1, ...newProduct })
      fs.writeFileSync(this.path, JSON.stringify(this.products, null, 2))
    }
  }

  // devolver el arreglo con todos los productos creados hasta ese momento
  getProducts = () => {
    if (fs.existsSync(this.path)) {
      const contenidoArchivo = fs.readFileSync(this.path, "utf-8")
    } else {
      fs.writeFileSync(this.path, JSON.stringify(this.products, null, 2))
      console.log("El arreglo de productos no se ha creado todavia")
    }
    return this.products
  }

  //el cual debe buscar en el arreglo el producto que coincida con el id. En caso de no coincidir ningún id, mostrar en consola un error “Not found”
  getProductById = (id) => {
    let product = this.products.find((prod) => prod.id == id)
    if (!product) return "No encontrado por ID"
    return product
  }

  getProductByCode = (code) => {
    let product = this.products.find((prod) => prod.code == code)
    if (!product) return "No encontrado por CODE"
    return product
  }

  updateProduct = (id, key, value) => {
    // let contenido = fs.readFileSync(this.path, "utf-8")
    let respuestaParseada = this.products.find((prod) => prod.id == id)
    if (!respuestaParseada) {
      ;("No encontrado por ID")
    } else {
      respuestaParseada[key] = value
      fs.writeFileSync(this.path, JSON.stringify(this.products, null, 2))
    }
  }

  deleteProduct = () => {
    //das
  }

  limpiarArray = () => {
    fs.unlinkSync(this.path)
  }
}

//! Ejercicio 2
const product = new ProductManager()

product.limpiarArray()

console.log(product.getProducts())
product.addProduct({
  title: "producto prueba",
  description: "Este es un producto prueba",
  price: 200,
  thumbnail: "Sin imagen",
  code: "abc123",
  stock: "25",
})
console.log(product.getProducts())
product.addProduct({
  title: "producto prueba2",
  description: "Este es un producto prueba2",
  price: 2002,
  thumbnail: "Sin imagen2",
  code: "abc1232",
  stock: "252",
})
console.log(product.getProducts())
console.log(product.getProductById(1))
console.log(product.getProductById(5))
console.log(product.getProductByCode("abc1232"))
console.log(product.getProductByCode("papaya"))
product.updateProduct(2, "price", 100)
product.updateProduct(1, "title", "Messi")

console.log("------------------")
console.log("Nuevas pruebas")

// product.deleteProduct()
console.log(product.getProducts())
