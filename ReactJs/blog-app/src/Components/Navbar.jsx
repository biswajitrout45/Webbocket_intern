import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="flex justify-between items-center px-20 py-2 bg-slate-600 shadow-lg text-white">
      <h1 className="text-2xl font-semibold">LatestBlog</h1>

      <ul className="flex gap-4">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/create">Create Post</Link>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
