import mongoose from "mongoose";

// register all the schema
import "../../models/Class";
import "../../models/Subject";
import "../../models/User";
import "../../models/Attendance";
import "../../models/Exam";

export const connectDB = async () => {
  const state = mongoose.connection.readyState;

  if (
    state === mongoose.ConnectionStates.connected ||
    state === mongoose.ConnectionStates.connecting
  ) {
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      dbName: process.env.DB_NAME,
    });
    console.log("Connected to MongoDB successfully!");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    throw error;
  }
};
