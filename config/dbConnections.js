const mongoose = require('mongoose')
const connectDb = async () => {
  try {
    const connect = await mongoose.connect(process.env.CONNECTION_STRING)
    console.log(
      'Database Created: ',
      connect.connection.host,
      connect.connection.name
    )
  } catch (err) {
    console.log(err.stack)
    process.exit(1)
  }
}
module.exports = connectDb
