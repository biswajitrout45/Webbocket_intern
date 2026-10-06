import React from "react";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import Home from "./Screens/Home";
import CreateBlog from "./Screens/CreateBlog";
import EditBlog from "./Screens/EditBlog";
import BlogDetails from "./Screens/BlogDetails";

import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<CreateBlog />} />
        <Route path="/edit/:id" element={<EditBlog />} />
        <Route path="/blog/:id" element={<BlogDetails />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
};

export default App;
