import express from "express";
import "express-async-errors";
import cookieSession from "cookie-session";

import { signupRouter } from "./routes/signup.js";
import { signinRouter } from "./routes/signin.js";
import { signoutRouter } from "./routes/signout.js";
import { currentUserRouter } from "./routes/currentUser.js";

import { errorHandler } from "./middlewares/error-handler.js";
import { NotFoundError } from "./errors/not-found-error.js";

const app = express();

app.set("trust proxy", true);
app.use(express.json());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== "test",
  }),
);

app.use(currentUserRouter);
app.use(signupRouter);
app.use(signinRouter);
app.use(signoutRouter);

app.all("*", async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
