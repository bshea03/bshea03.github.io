import mongoose from "mongoose";

const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/portfolio";

export async function connectDB() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log(`Connected to MongoDB: ${mongoose.connection.name}`);
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error;
  }
}

export async function closeDB() {
  await mongoose.connection.close();
  console.log("MongoDB connection closed");
}

// Graceful shutdown
process.on("SIGINT", async () => {
  await closeDB();
  process.exit(0);
});
