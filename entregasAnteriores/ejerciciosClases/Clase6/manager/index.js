const { UserManager } = require("./userManager")

const manager = new UserManager()

const env = async () => {
  let primeraConsultaUsuarios = await manager.consultarUsuario()
  console.log(primeraConsultaUsuarios)

  let user = {
    nombre: "Rapme",
    apellido: "Ram",
    edad: 26,
    curso: "Backend",
    pass: "123",
  }

  // let result = await manager.crearUsuario(user)
  // console.log(result)

  // let segundaConsultaUsuarios = await manager.consultarUsuario()
  // console.log(segundaConsultaUsuarios)

  manager.validarUsuario("Rapme", "12333")
}

env()
