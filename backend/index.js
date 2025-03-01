import { PORT, mongoDbURL } from "./config.js";
import express, { json } from "express";
import mongoose from "mongoose";
import { bookModel } from "./models/bookModel.js";

const app = express();

// Middle-ware
app.use(express.json());

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

app.post("/books", async (req, res) => {
  try {
    if (!req.body.name || !req.body.author || !req.body.genre) {
      return res
        .status(500)
        .send({ message: "Provide all the required data." });
    }

    const newBook = {
      name: req.body.name,
      author: req.body.author,
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

app.get("/OneBook/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const book = await bookModel.findById(id);
    console.log(id);
    return res.status(200).json(book);
  } catch (error) {
    res.status(400).send("Error");
  }
});

app.delete("/deleteBook/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await bookModel.findByIdAndDelete(id);
    if (!result) {
      return res.status(400).json({ message: "Can't delete. Not found" });
    }

    return res.status(200).json({ message: "Delete success" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

app.put("/updateBook/:id", async (req, res) => {
  try {
    if (!req.body.name || !req.body.author || !req.body.genre) {
      return res
        .status(500)
        .json({ message: "Invalid data. Please send all details" });
    }

    const { id } = req.params;

    const result = await bookModel.findByIdAndUpdate(id, req.body);
    if (!result) {
      return res
        .status(404)
        .json({ message: "Oopps! unable to update please try again" });
    }
    return res.status(201).json({ message: "update success." });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});
