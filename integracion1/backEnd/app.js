const cluster = require('cluster')
const { cpus } = require('os')
const { initServer } = require('./src/server')
const { logger } = require('./src/config/logger')

logger.info(cluster.isPrimary)
logger.info(cpus())
const numeroDeProcesadores = cpus().length

logger.info('Cantidad de hilos de ejecición ', numeroDeProcesadores)

if (cluster.isPrimary) {
  logger.info('Proceso primario, generando proceso ')
  for (let i = 0; i < numeroDeProcesadores; i++) {
    cluster.fork()
  }
  cluster.on('message', worker => {
    logger.info(`El worker ${worker.process.id} dice ${worker.message}`)
  })
} else {
  logger.info('Al no ser un proceso forkeado, no cuenta como primario por lo tanto isPrimary en false')
  initServer()
}
