import mongoose from "mongoose";

const bookSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    author: {
      type: String,
      required: true,
    },

    publication_year: {
      type: Number,
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

export const bookModel = mongoose.model("Books", bookSchema);
