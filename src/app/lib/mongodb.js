
import mongoose from 'mongoose'

const mongodbUrl = "mongodb+srv://tecxra1003:tecmob1003@cluster0.arwd4rf.mongodb.net/stickerSaver"

if (!mongodbUrl) {
  throw new Error(
    'Please define the mongodbUrl environment variable inside .env',
  )
}

let cached = global.mongoose

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null }
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn
  }
  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    }
    cached.promise = mongoose.connect(mongodbUrl, opts).then(mongoose => {
      console.log('Db connected')
      return mongoose
    })
  }
  try {
    cached.conn = await cached.promise
  } catch (e) {
    cached.promise = null
    throw e
  }

  return cached.conn
}

export default dbConnect