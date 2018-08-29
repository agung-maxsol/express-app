const logger = require('../services/logger')

// Homepage (/) -- with example to use session
exports.index = (req, res) => {
  req.session.views = (req.session.views || 0) + 1

  res.json({
    status: true,
    message: 'Hello world!',
    views: req.session.views
  })
}

// Error page (/error) -- with example to throw an error and have them logged
exports.error = (req, res) => {
  throw new Error('This is an intended error!')
}

exports.notFoundHandler = (req, res, next) => {
  logger.log('error', 'Route not found! Referrer: ' + req.originalUrl)

  res.status(404).json({
    status: false,
    error: 'Unable to find the resource!'
  })
}

exports.errorHandler = (err, req, res, next) => {
  // console.error(err.stack)
  logger.log('error', err.stack)

  res.status(500).json({
    status: false,
    error: 'Internal server error!'
  })
}
