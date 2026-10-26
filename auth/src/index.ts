import mongoose from "mongoose";
import { app } from "./app.js";

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error("JWT_KEY must be defined");
  }
  try {
    await mongoose.connect("mongodb://auth-mongo-srv:27017/auth");
    console.log("MongoDB Connected!");
  } catch (error) {
    console.log(error);
  }
};

app.listen(3000, () => {
  console.log("Server running on port 3000!!!!!");
});

await start();
