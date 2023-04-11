const fs = require("fs")

class FileManager {
  constructor(archivo) {
    this.archivo = archivo
    this.path = "./"
  }

  writefile = async (archivo) => {
    try {
      await fs.promises.writeFile(this.path, JSON.stringify(data, null, 2))
    } catch (error) {
      console.log(error)
    }
  }

  readFile = async (archivo) => {
    try {
      const data = await fs.promises.readFile(this.archivo)
      return JSON.parse(data)
    } catch (error) {
      console.log(error)
    }
  }
}

const fileManager = new FileManager()

module.exports = fileManager
