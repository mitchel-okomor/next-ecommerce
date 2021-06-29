import mongoose from "mongoose";

const connectDB = () => {
  if (mongoose.connection.readyState) {
    console.log("Already conected");
    return;
  }
  mongoose.connect(
    process.env.MONGO_URL,
    {
      useCreateIndex: true,
      useFindAndModify: false,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    (err) => {
      if (err) throw err;
      console.log("Connected to mongoDb");
    }
  );
};

export default connectDB;
