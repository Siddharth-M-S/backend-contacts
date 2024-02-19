console.log('hi')
const express = require('express')
const connectDb = require('./config/dbConnections')
const dotenv = require('dotenv').config()
connectDb()
const errorHandler = require('./middleware/errorhandler')
const validateToken = require('./middleware/validateTokenHandler')
// const validateToken = require
const app = express()
const port = process.env.PORT || 3001
app.use(express.json())

app.use('/api/contacts', require('./routes/contactRoutes'))
app.use('/api/user', require('./routes/userRoutes'))
app.use(errorHandler)
// app.use(validateToken)
app.listen(port, () => {
  console.log(`server running on port ${port}`)
})
