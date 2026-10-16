import express from "express";
import "express-async-errors";
import mongoose from "mongoose";

import { signupRouter } from "./routes/signup.js";
import { signinRouter } from "./routes/signin.js";
import { signoutRouter } from "./routes/signout.js";
import { currentUserRouter } from "./routes/currentUser.js";

import { errorHandler } from "./middlewares/error-handler.js";
import { NotFoundError } from "./errors/not-found-error.js";

const app = express();
app.use(express.json());

app.use(currentUserRouter);
app.use(signupRouter);
app.use(signinRouter);
app.use(signoutRouter);

app.all("*", async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

const start = async () => {
  await mongoose.connect("mongodb://auth-mongo-srv:27017/auth");
  console.log("MongoDB Connected!");
};

app.listen(3000, () => {
  console.log("Server running on port 3000!!!!!");
});

await start();
