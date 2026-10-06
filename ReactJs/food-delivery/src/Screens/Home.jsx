import React from "react";
import Hero from "../Components/HomeComponents/Hero";
import Category from "../Components/HomeComponents/Category";
import FoodMenu from "../Components/HomeComponents/FoodMenu";

const Home = ({ categories, selectedCategory, onSelectCategory, foodItems, cart, onAdd, onRemove }) => {
  const exploreMenu = () => document.getElementById("categories")?.scrollIntoView({ behavior: "smooth" });

  return (
    <main>
      <Hero onExplore={exploreMenu} />
      <Category
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={onSelectCategory}
      />
      <FoodMenu
        items={foodItems}
        cart={cart}
        onAdd={onAdd}
        onRemove={onRemove}
        selectedCategory={selectedCategory}
      />
      <footer className="bg-gray-900 text-white text-center py-6">
        <p className="font-semibold">FoodHub</p>
        <p className="text-gray-400 text-sm mt-1">Fresh food, delivered with love.</p>
      </footer>
    </main>
  );
};

export default Home;
