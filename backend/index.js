import { PORT, mongoDbURL } from "./config.js";
import express, { json } from "express";
import mongoose from "mongoose";
import bookRoute from "./routes/bookRoute.js";

const app = express();

// Middle-ware
app.use(express.json());
// Routing
app.use("/books", bookRoute);

//Connection
mongoose
  .connect(mongoDbURL)
  .then(() => {
    console.log("Success");
    app.listen(PORT, () => {
      console.log("Working just fine");
    });
  })
  .catch((error) => {
    console.log(error);
  });

app.get("/", (req, res) => {
  return res
    .status(234)
    .send("<center><h1>Welcome to the Book Store!!</h1></center>");
  // Using return to avoid further execution of any statement.
});
