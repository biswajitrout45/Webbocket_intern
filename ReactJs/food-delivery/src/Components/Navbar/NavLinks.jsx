import React from "react";
import { FaCartPlus } from "react-icons/fa";

const NavLinks = ({ cartCount, onCartClick }) => {
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <nav className="sticky top-0 z-40 px-6 lg:px-20 flex justify-between items-center bg-white py-3 shadow-md">
      <button type="button" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="text-3xl font-bold text-orange-500">
        FoodHub
      </button>

      <ul className="hidden md:flex gap-6 font-medium">
        <li><button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="hover:text-orange-500">Home</button></li>
        <li><button onClick={() => scrollTo("categories")} className="hover:text-orange-500">Categories</button></li>
        <li><button onClick={() => scrollTo("menu")} className="hover:text-orange-500">Menu</button></li>
      </ul>

      <button
        type="button"
        onClick={onCartClick}
        aria-label="Open cart"
        className="relative flex items-center gap-2 bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition"
      >
        <FaCartPlus />
        {cartCount > 0 && (
          <span className="absolute -top-2 -right-2 min-w-5 h-5 px-1 rounded-full bg-red-500 text-xs flex items-center justify-center">
            {cartCount}
          </span>
        )}
      </button>
    </nav>
  );
};

export default NavLinks;
