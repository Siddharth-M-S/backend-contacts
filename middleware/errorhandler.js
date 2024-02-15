const { constants } = require('../constants')
const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500
  switch (statusCode) {
    case constants.VALIDATION_ERROR:
      res.json({
        title: 'validaton failed',
        message: err.message,
        stackTrace: err.stack,
      })
      break
    case constants.UNAUTHORIZED:
      res.json({
        title: 'Unauthorized',
        message: err.message,
        stackTrace: err.stack,
      })
    //   break
    case constants.FORBIDDEN:
      res.json({
        title: 'forbidden',
        message: err.message,
        stackTrace: err.stack,
      })
    //   break
    case constants.NOT_FOUND:
      res.json({
        title: 'Not Found',
        message: err.message,
        stackTrace: err.stack,
      })
    //   break
    case constants.SERVER_ERROR:
      res.json({
        title: 'Server Error',
        message: err.message,
        stackTrace: err.stack,
      })
    default:
      console.log('No Error, Good to go')
      break
  }
  //   res.json({ title: 'Not Found', message: err.message, stackTrace: err.stack })
}

module.exports = errorHandler
