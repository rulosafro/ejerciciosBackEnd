const bcrypt = require("bcrypt")

const createHash = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10))
}

const validPassword = (password, user) =>
  bcrypt.compareSync(password, user.password)

module.exports = {
  validPassword,
  createHash,
}
