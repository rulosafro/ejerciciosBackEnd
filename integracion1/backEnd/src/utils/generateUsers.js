const { faker } = require('@faker-js/faker')

const generateProduct = () => {
  return {
    title: faker.commerce.productName(),
    price: faker.commerce.price(),
    department: faker.commerce.department(),
    stock: faker.random.numeric(),
    description: faker.commerce.productDescription(),
    id: faker.database.mongodbObjectId(),
    image: faker.image.image(),
  }
}

exports.generateUser = () => {
  let numOfProducts = parseInt(faker.random.numeric(1, {bannedDigits: ['0']}))
  let products = []
  for (let i = 0; i < numOfProducts; i++) {
    products.push(generateProduct())    
  }
  return {
    name: faker.name.firstName(),
    last_name: faker.name.lastName(),
    sex: faker.name.sex(),
    birthDate: faker.date.birthdate(),
    phone: faker.phone.number(),
    image: faker.image.avatar(),
    id: faker.database.mongodbObjectId(),
    email: faker.internet.email(),
    products
  }
}