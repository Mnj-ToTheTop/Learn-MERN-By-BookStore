import { PORT } from "./config.js";
import express from "express";

const app = express();

app.get("/", (req, res) => {
  return res
    .status(234)
    .send("<center><h1>Welcome to the Book Store!!</h1></center>");
  // Using return to avoid further execution of any statement.
});

app.listen(PORT, () => {
  console.log("Working just fine");
});
