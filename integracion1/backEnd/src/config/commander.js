const { Command } = require("commander")

const commander = new Command()

commander.option("--mode <mode>", "Modo de trabajo", "development")
commander.parse()

module.exports = { commander }
