const products = []
contador = 0

class ProductManager {
  constructor(title, description, price, thumbnail, code, stock, id) {
    this.title = title
    this.description = description
    this.price = price
    this.thumbnail = thumbnail
    this.code = code
    this.stock = stock
    this.id = contador
  }
}

// Debe contar con un método “addProduct” el cual agregará un producto al arreglo de productos inicial. - Validar que no se repita el campo “code” y que todos los campos sean obligatorios -  Al agregarlo, debe crearse con un id autoincrementable
const addProduct = (title, description, price, thumbnail, code, stock) => {
  if (title != "" && description != "" && price != "" && thumbnail != "" && stock != "" && code != "") {
    const codigos = products.map(({ code }) => code)

    if (code != codigos) {
      contador = contador + 1
      const title2 = new ProductManager(title, description, price, thumbnail, code, stock)
      products.push({ ...title2 })
    } else {
      console.log("Es necesario modificar el campo code")
    }
  } else {
    console.log("Es necesario rellenar todos los campos")
  }
}

//devolver el arreglo con todos los productos creados hasta ese momento
const getProducts = () => {
  console.log(products)
}

//el cual debe buscar en el arreglo el producto que coincida con el id.
//En caso de no coincidir ningún id, mostrar en consola un error “Not found”
const getProductById = (idBuscado) => {
  const idBox = products.map(({ id }) => id)
  if (idBox.some((el) => el === idBuscado)) {
    console.log(products[idBuscado - 1])
    console.log("asdaskl")
  } else {
    console.error("ID no encontrado")
  }
}

const getProductByCode = (codeBuscado) => {
  const codeBox = products.map(({ code }) => code)
  if (codeBox.some((el) => el === codeBuscado)) {
    function listoPrint(products) {
      return products.code === codeBuscado
    }
    console.log(products.find(listoPrint))

    // const object = products.filter((code) => code === codeBuscado)
  } else {
    console.error("CODE no encontrado")
  }
}

//! Ejecución
getProducts()

console.log("--------")

addProduct("producto prueba", "Este es un producto prueba", 200, "Sin imagen", "abc123", "25")
addProduct("producto prueba1", "Este es un producto prueba1", 201, "Sin imagen1", "abc123", "75")
addProduct("producto prueba1", "Este es un producto prueba1", 201, "Sin imagen1", "abc1223", "75")
addProduct("producto prueba1", "Este es un producto prueba1", 201, "Sin imagen1", "abc122s3", "75")
addProduct("producto prueba1", "Este es un producto prueba1", 201, "Sin imagen1", "abc12AS2s3", "75")
addProduct("producto prueba1", "Este es un producto prueba1", 201, "Sin imagen1", "abc1sAS223", "75")
addProduct("producto prueba2", "", 202, "Sin imagen", "abc123", "49")
getProducts()

console.log("--------")

getProductById(4)
getProductById(10)
getProductByCode("abc1sAS223")
getProductByCode(22)
