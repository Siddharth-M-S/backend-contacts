const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')
const validateToken = asyncHandler(async (req, res, next) => {
  let token
  const authHeader = req.headers.Authorization || req.headers.authorization
  if (authHeader && authHeader.startsWith('Bearer')) {
    token = authHeader.split(' ')[1]
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        res.status(401)
        throw new Error('User not authorized')
      }
      req.user = decoded.user
      next()
      console.log(decoded.user)
    })
  }
})
module.exports = validateToken
