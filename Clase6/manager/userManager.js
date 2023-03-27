const fs = require("fs")
const crypto = require("crypto")

const path = "./files/users.json"

class UserManager {
  consultarUsuario = async () => {
    try {
      if (fs.existsSync(path)) {
        const data = await fs.promises.readFile(path, "utf8")
        const user = JSON.parse(data)
        return user
      }
      await fs.promises.writeFile(path, "[]", "utf-8")
      return []
    } catch (error) {
      console.log(error)
    }
  }

  crearUsuario = async (usuario) => {
    try {
      const users = await this.consultarUsuario()
      users.length === 0 ? (usuario.id = 1) : (usuario.id = users[users.length - 1].id + 1)

      usuario.salt = crypto.randomBytes(128).toString("base64")
      usuario.password = crypto.createHmac("sha256", usuario.salt).update(usuario.pass).digest("hex")
      users.push(usuario)

      await fs.promises.writeFile(path, JSON.stringify(users, null, 2), "utf-8")
      return usuario
    } catch (error) {
      console.log(error)
    }
  }

  validarUsuario = async (nombre, pass) => {
    const usuarios = await this.consultarUsuario()
    const usuarioIndex = usuarios.findIndex((usuario) => usuario.nombre === nombre)

    if (usuarioIndex === -1) {
      console.log("error, usuario no encontrado")
      return
    }
    const usuario = usuarios[usuarioIndex]
    const newHash = crypto.createHmac("sha256", usuario.salt).update(pass).digest("hex")

    if (newHash === usuario.password) {
      console.log("logueado")
    } else {
      console.log("contraseña invalida")
    }
  }
}

module.exports = {
  UserManager,
}
