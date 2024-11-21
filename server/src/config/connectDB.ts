import mongoose from "mongoose"

const connectDB: () => Promise<void> = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string, {
      dbName: "tatos",
    })
    console.log(`Successfully connected to MongoDB 👍`)
  } catch (error) {
    // Убедимся, что `error` является объектом и имеет свойство `message`
    if (error instanceof Error) {
      console.error(`ERROR: ${error.message}`)
    } else {
      console.error(`Unknown error: ${error}`)
    }
    process.exit(1)
  }
}

export default connectDB
