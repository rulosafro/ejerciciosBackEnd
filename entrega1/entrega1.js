let productos = []
class ProductManager {
  constructor() {
    this.products = productos
  }

  // static contador = 0

  // Debe contar con un método “addProduct” el cual agregará un producto al arreglo de productos inicial. - Validar que no se repita el campo “code” y que todos los campos sean obligatorios -  Al agregarlo, debe crearse con un id autoincrementable
  addProduct = (newProduct) => {
    if (!newProduct.title || !newProduct.description || !newProduct.price || !newProduct.thumbnail || !newProduct.code || !newProduct.stock) {
      return "Es necesario rellenar todos los campos"
    }

    let product = this.products.find((prod) => prod.code == newProduct.code)
    if (product) return "Es necesario modificar el campo code"

    if (this.products.length == 0) {
      return this.products.push({ id: 1, ...newProduct })
    }

    return this.products.push({ id: this.products[this.products.length - 1].id + 1, ...newProduct })
  }

  //devolver el arreglo con todos los productos creados hasta ese momento
  getProducts = () => {
    return this.products
  }

  //el cual debe buscar en el arreglo el producto que coincida con el id.
  //En caso de no coincidir ningún id, mostrar en consola un error “Not found”
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
}

const product = new ProductManager()

// !EJECICIÓN NUEVA
//Ingreso primer producto
product.addProduct({
  title: "producto prueba",
  description: "Este es un producto prueba",
  price: 200,
  thumbnail: "Sin imagen",
  code: "abc123",
  stock: "25",
})

product.addProduct({
  title: "producto prueba22",
  description: "Este es un producto prueba222",
  price: 20022,
  thumbnail: "Sin imagen22",
  code: "abc12223",
  stock: "25222",
})

console.log(product.getProducts())

//Ingreso segundo producto
console.log(
  product.addProduct({
    title: "producto prueba2 aaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    description: "Este es un producto prueba2",
    price: 201,
    thumbnail: "Sin imagen 2",
    code: "abc12322",
    stock: "252",
  })
)

// ? Error por codigo repetido
console.log(
  product.addProduct({
    title: "producto ESTA FALLANDOOOO :(",
    description: "Este es un producto prueba2",
    price: 201,
    thumbnail: "Sin imagen 2",
    code: "abc12322",
    stock: "252",
  })
)

//* Error por falta de campos
console.log(
  product.addProduct({
    title: "producto prueba2",
    description: "Este es un producto prueba2",
  })
)

console.log(product.getProducts())

// Busqueda de Productos
console.log(product.getProductById(3))
console.log(product.getProductByCode("abc123"))
