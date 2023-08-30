const bcrypt = require('bcrypt')

exports.createHash = (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(10))
exports.validPassword = (password, user) => bcrypt.compareSync(password, user.password)
