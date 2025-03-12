import mongoose from "mongoose";

const connectDB = async () => {
  await mongoose.connect(process.env.MONGO_DB_URL);
};

export default connectDB;
