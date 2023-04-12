const fs = require("fs")

class ProductManager {
  constructor() {
    this.products = []
    this.path = "./src/data/products.json"
  }

  // devolver el arreglo con todos los productos creados hasta ese momento
  getProducts = async () => {
    try {
      const existe = fs.existsSync(this.path)
      // console.log(existe)
      let contenido = await fs.promises.readFile(this.path, "utf-8")
      const parseData = JSON.parse(contenido)

      if (existe) {
        // let contenido = await fs.promises.readFile(this.path, "utf-8")
        // const parseData = JSON.parse(contenido)
        return parseData
      } else {
        fs.writeFileSync(this.path, JSON.stringify(this.products, null, 2))

        console.log("El arreglo de productos no se ha creado todavia, asi que escribimos uno nuevo")
      }
    } catch (error) {
      return console.log(error)
    }
  }

  // Debe contar con un método “addProduct” el cual agregará un producto al arreglo de productos inicial. - Validar que no se repita el campo “code” y que todos los campos sean obligatorios -  Al agregarlo, debe crearse con un id autoincrementable
  addProduct = async (newProduct) => {
    try {
      if (!newProduct.title || !newProduct.description || !newProduct.code || !newProduct.price || !newProduct.status || !newProduct.stock || !newProduct.category || newProduct.id) {
        return "Es necesario rellenar todos los campos"
      }

      if (
        typeof newProduct.title !== "string" ||
        typeof newProduct.description !== "string" ||
        typeof newProduct.code !== "string" ||
        typeof newProduct.status !== "boolean" ||
        typeof newProduct.price !== "number" ||
        typeof newProduct.stock !== "number" ||
        typeof newProduct.category !== "string"
      ) {
        return "Es necesario rellenar los campos con los tipos de datos correctos"
      }

      let contenido = await fs.promises.readFile(this.path, "utf-8")
      const parseData = JSON.parse(contenido)

      let product = parseData.find((prod) => prod.code == newProduct.code)
      if (product) return "Es necesario modificar el campo code"

      if (parseData.length == 0) {
        parseData.push({ id: 1, newProduct })
        fs.writeFileSync(this.path, JSON.stringify(parseData, null, 2))
      } else {
        parseData.push({ id: parseData[parseData.length - 1].id + 1, newProduct })
        fs.writeFileSync(this.path, JSON.stringify(parseData, null, 2))
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

  getProductByCode = async (code) => {
    try {
      let contenido = await fs.promises.readFile(this.path, "utf-8")
      const parseData = JSON.parse(contenido)
      let product = parseData.find((prod) => prod.code == code)
      if (product) {
        console.log(product)
      } else {
        console.log("No encontrado por Code")
      }
    } catch (error) {
      console.log(error)
    }
  }

  updateProduct = async (pid, productMod) => {
    try {
      //! Validar si todos los campos son necesarios
      let contenido = await this.getProducts()
      let respuestaParseada = await contenido.find((prod) => prod.id == pid)
      const index = contenido.findIndex((prod) => prod.id == pid)

      if (!respuestaParseada || index == -1) {
        console.log("El producto no existe")
      } else {
        Object.assign(contenido[pid - 1], productMod)
        await fs.promises.writeFile(this.path, JSON.stringify(contenido, null, 2))
      }
    } catch (error) {
      console.log(error)
    }
  }

  deleteProduct = async (pid) => {
    // let respuestaParseada = this.products.find((prod) => prod.id == id)
    let contenido = await this.getProducts()
    let respuestaParseada2 = contenido.findIndex((prod) => prod.id == pid)
    console.log(respuestaParseada2)
    try {
      if (respuestaParseada2 > -1) contenido.splice(respuestaParseada2, 1)
      await fs.promises.writeFile(this.path, JSON.stringify(contenido, null, 2))
    } catch (error) {
      console.log(error)
    }
  }

  limpiarArray = async () => {
    try {
      await fs.promises.unlink(this.path)
      console.log("Se elimino el archivo para reiniciar el proceso")
    } catch (error) {
      console.log(error)
    }
  }
  writeFile = async (data) => {
    try {
      await fs.promises.writeFile(this.path, JSON.stringify(data, null, 2))
    } catch (error) {
      console.log(error)
    }
  }
}

const product = new ProductManager()

module.exports = { ProductManager }
