const { faker } = require('@faker-js/faker')

exports.generateProduct = () => {
  return {
    title: faker.commerce.productName(),
    price: faker.commerce.price(),
    department: faker.commerce.department(),
    stock: faker.string.numeric(),
    description: faker.commerce.productDescription(),
    id: faker.database.mongodbObjectId(),
    code: faker.database.mongodbObjectId(),
    image: faker.image.url()
  }
}
