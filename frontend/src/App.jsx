import React from "react";
import { Route, Routes } from "react-router-dom";
import CreateBook from "./pages/createBook";
import DeleteBook from "./pages/deleteBook";
import Home from "./pages/home";
import GetBooks from "./pages/GetBooks";
import UpdateBook from "./pages/updateBook";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/book/create" element={<CreateBook />} />
      <Route path="/book/delete/:id" element={<DeleteBook />} />
      <Route path="/book/update/:id" element={<UpdateBook />} />
      <Route path="/book/details/:id" element={<GetBooks />} />
    </Routes>
  );
};

export default App;
