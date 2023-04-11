const fs = require("fs")

class ProductManager {
  constructor() {
    this.products = []
    this.path = "./data/catalogo2.json"
  }

  // devolver el arreglo con todos los productos creados hasta ese momento
  getProducts = async () => {
    try {
      const existe = fs.existsSync(this.path)
      // console.log(existe)

      if (existe) {
        let contenido = await fs.promises.readFile(this.path, "utf-8")
        const parseData = JSON.parse(contenido)
        return parseData
      } else {
        fs.writeFileSync(this.path, JSON.stringify(this.products, null, 2))

        console.log("El arreglo de productos no se ha creado todavia, asi que escribimos uno nuevo")
      }

      return this.products
    } catch (error) {
      return console.log(error)
    }
  }

  // Debe contar con un método “addProduct” el cual agregará un producto al arreglo de productos inicial. - Validar que no se repita el campo “code” y que todos los campos sean obligatorios -  Al agregarlo, debe crearse con un id autoincrementable
  addProduct = async (newProduct) => {
    try {
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
    } catch (error) {
      console.log(error)
    }
  }

  getProductById = async (id) => {
    const contenido = await fs.promises.readFile(this.path, "utf-8")
    let product = JSON.parse(contenido)
    let product2 = product.find((prod) => prod.id == id)
    if (!product2) return "No encontrado por ID"

    return product2
  }

  getProductByCode = (code) => {
    try {
      let product = this.products.find((prod) => prod.code == code)
      if (product) {
        console.log(product)
      } else {
        console.log("No encontrado por Code")
      }
    } catch (error) {
      console.log(error)
    }
  }

  updateProduct = async (id, key, value) => {
    try {
      let respuestaParseada = await this.products.find((prod) => prod.id == id)
      if (!respuestaParseada) {
        ;("No encontrado por ID")
      } else {
        respuestaParseada[key] = value
        await fs.promises.writeFile(this.path, JSON.stringify(this.products, null, 2))
      }
    } catch (error) {
      console.log(error)
    }
  }

  deleteProduct = async (id) => {
    // let respuestaParseada = this.products.find((prod) => prod.id == id)
    let respuestaParseada2 = this.products.findIndex((prod) => prod.id == id)
    try {
      if (respuestaParseada2 > -1) this.products.splice(respuestaParseada2, 1)
      await fs.promises.writeFile(this.path, JSON.stringify(this.products, null, 2))
    } catch (error) {
      console.log(error)
    }
  }

  limpiarArray = async () => {
    try {
      // console.log(this.products)
      await fs.promises.unlink(this.path)
      console.log("Se elimino el archivo para reiniciar el proceso")
    } catch (error) {
      console.log(error)
    }
  }
}

const product = new ProductManager()

module.exports = { ProductManager }
