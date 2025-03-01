import mongoose from "mongoose";

const bookSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    author: {
      type: String,
      required: true,
    },

    genre: {
      type: String,
      required: true,
    },
  },
  {
    timestamp: true,
  }
);

export const bookModel = mongoose.model("book", bookSchema);
