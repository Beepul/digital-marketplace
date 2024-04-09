require("dotenv").config();
import mongoose from "mongoose";

const mongoUrl = process.env.MONGO_URL || "";

const connectDB = async () => {
  try {
    await mongoose.connect(mongoUrl).then((data) => {
      console.log(`[db_success]: Database connected with ${data.connection.host}`);
    });
  } catch (error: any) {
    console.error(`[db_error]: ${error.message}`);
    setTimeout(connectDB, 5000);
  }
};

export default connectDB;