const generateRegisterErrorInfo = (user) => {
  return `
  One or more properties ware incomplete or not valid. 
    Listado de requerimientos de propiedades de user:
    * nickname: needs to a String, received ${user.nickname}
    * first_name: needs to a String, received ${user.first_name}
    * last_name: needs to a String, received ${user.last_name}
    * age: needs to a String, received ${user.age}
    `
}
// * email: needs to a String, received ${email}
// * password: needs to a String, received ${password}

const generateLoginErrorInfo = (login) => {
  return `
  One or more properties ware incomplete or not valid. 
    Listado de requerimientos de propiedades del login:
    * email: needs to a String, received ${login.email}
    * password: needs to a String, received ${login.password}`
}

const generateProductErrorInfo = (product) => {
  return `
  One or more properties ware incomplete or not valid. 
    Listado de requerimientos de propiedades del product:
    * id: needs to a String, received ${product.pid}
`
}

const generateCartErrorInfo = (cart) => {
  return `
  One or more properties ware incomplete or not valid. 
    Listado de requerimientos de propiedades del cart:
    * first_name: needs to a String, received ${cart.first_name}
    * last_name: needs to a String, received ${cart.last_name}
    * email: needs to a String, received ${cart.email}`
}

module.exports = {
  generateCartErrorInfo,
  generateLoginErrorInfo,
  generateRegisterErrorInfo,
  generateProductErrorInfo
}
