const fs = require("fs")

// console.log(fs)

//! Sincronico

fs.writeFileSync("./entrega2/test.txt", "Hola Coders! \n", "utf-8")

// Saber si existe el archivo
console.log(fs.existsSync("./entrega2/test.txt"))

// texto agregado
fs.appendFileSync("./entrega2/test.txt", "Aguante el Bulla", "utf-8")

//Leer
if (fs.existsSync) {
  const leer = fs.readFileSync("./entrega2/test.txt", "utf-8")
  console.log(leer)
}

fs.unlinkSync("./entrega2/test.txt")

//! Callbacks

// let texto = "lorem20"

// fs.writeFile("./entrega2/test.txt", texto, "utf-8", (err) => {
//   if (err) console.log("error")
// })

//! Promesas

// const opeAsync = async () => {
//   try {
//     await fs.appendFile("./entrega2/test.txt", "Aguante el Bulla88888", "utf-8")
//     let contenido = await fs.promises.readFile("./entrega2/test.txt", "utf-8")
//     console.log(contenido)

//     await fs.unlink("./entrega2/test.txt")
//   } catch (error) {
//     console.log(error)
//   }
// }

// opeAsync()

//! Datos Complejos

const opeAsync = async () => {
  try {
    // await fs.appendFile("./entrega2/test.txt", "Aguante el Bulla88888", "utf-8")
    let contenido = await fs.promises.readFile("./package.json", "utf-8")
    const respuestaParseada = JSON.parse(contenido)
    respuestaParseada.apellido = "elbullita"
    console.log(respuestaParseada)
    const respParseadaJson = JSON.stringify(respuestaParseada, null, 2)
    console.log(respParseadaJson)

    await fs.promises.writeFile("./data.json", respParseadaJson, "utf-8")
    // console.log(JSON.parse(contenido))

    // await fs.unlink("./entrega2/test.txt")
  } catch (error) {
    console.log(error)
  }
}

opeAsync()
