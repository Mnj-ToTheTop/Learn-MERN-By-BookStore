import { PORT, mongoDbURL } from "./config.js";
import express, { json } from "express";
import mongoose from "mongoose";
import { bookModel } from "./models/bookModel.js";

const app = express();

app.use(express.json());
app.get("/", (req, res) => {
  return res
    .status(234)
    .send("<center><h1>Welcome to the Book Store!!</h1></center>");
  // Using return to avoid further execution of any statement.
});

app.post("/books", async (req, res) => {
  try {
    if (
      !req.body.title ||
      !req.body.author ||
      !req.body.publication_year ||
      !req.body.genre
    ) {
      return res
        .status(500)
        .send({ message: "Provide all the required data." });
    }

    const newBook = {
      title: req.body.title,
      author: req.body.author,
      publication_year: req.body.publication_year,
      genre: req.body.genre,
    };

    const book = await bookModel.create(newBook);
    console.log("hey");
    return res.status(201).send(book);
    // console.log("hey")
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Something went wrong!!" });
  }
});

app.get("/books", async (req, res) => {
  try {
    const books = await bookModel.find({});
    return res.status(200).json({
      count: books.length,
      data: books,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).send({ message: "error" });
  }
});

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
