const winston = require('winston')
const logger = winston.createLogger({
  format: winston.format.simple(),
  transports: [
    new winston.transports.File({
      filename: 'logs/error.log',
      level: 'error',
      maxsize: 10485760 // 10 MB
    })
  ]
})

module.exports = logger
