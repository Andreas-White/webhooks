import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config({ path: 'keys.env' })

const uri = process.env.MONGO_DB_URI

const connect = async (error) => {
  // Get notifications
  mongoose.connection.on('connected', () => console.log('connected!!'))
  mongoose.connection.on('error', () => console.log(`error!!:${error}`))
  mongoose.connection.on('disconnected', () => console.log('disconnected!!'))

  // If the node process ends, close the connection
  process.on('SIGINT', () => {
    mongoose.connection.close(() => {
      console.log('Connection closed, due to application termination')
      process.exit(0)
    })
  })

  // Connect to the server
  return mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
}

export default {
  connect,
}
