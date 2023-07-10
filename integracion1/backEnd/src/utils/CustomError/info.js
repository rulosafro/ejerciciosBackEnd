exports.generateRegisterErrorInfo = (register) => {
  return `
  One or more properties ware incomplete or not valid. 
    Listado de requerimientos de propiedades de register:
    * nickname: needs to a String, received ${register.nickname}
    * first_name: needs to a String, received ${register.first_name}
    * last_name: needs to a String, received ${register.last_name}
    * email: needs to a String, received ${register.email}
    * password: needs to a String, received ${register.password}
    * age: needs to a String, received ${register.age}
    `
}

exports.generateLoginErrorInfo = (login) => {
  return `
  One or more properties ware incomplete or not valid. 
    Listado de requerimientos de propiedades del login:
    * email: needs to a String, received ${login.email}
    * password: needs to a String, received ${login.password}`
}

exports.generateProductErrorInfo = (product) => {
  return `
  One or more properties ware incomplete or not valid. 
    Listado de requerimientos de propiedades del product:
    * id: needs to a String, received ${product.pid}
`
}

exports.generateCartErrorInfo = (cart) => {
  return `
  One or more properties ware incomplete or not valid. 
    Listado de requerimientos de propiedades del cart:
    * first_name: needs to a String, received ${cart.first_name}
    * last_name: needs to a String, received ${cart.last_name}
    * email: needs to a String, received ${cart.email}`
}