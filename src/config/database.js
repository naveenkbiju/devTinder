import mongoose from "mongoose";

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://naveenkbiju123:qWJYqz653xzQnu7f@learningnode.lufxe.mongodb.net/devTinder"
  );
};

export default connectDB;
