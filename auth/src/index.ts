import express from "express";
import { currentUserRouter } from "./routes/currentUser.js";

const app = express();
app.use(express.json());

app.use(currentUserRouter);

app.listen(3000, () => {
  console.log("Server running on port 3000!!!!!");
});
