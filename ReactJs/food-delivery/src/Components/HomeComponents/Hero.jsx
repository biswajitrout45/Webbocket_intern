import React from "react";
import food from "../../assets/food.jpg";

const Hero = ({ onExplore }) => (
  <section className="w-full min-h-[70vh] relative">
    <img src={food} alt="Delicious food" className="absolute inset-0 h-full w-full object-cover" />
    <div className="absolute inset-0 bg-black/60" />
    <div className="relative min-h-[70vh] flex flex-col justify-center items-center text-center text-white px-6">
      <span className="text-orange-400 font-semibold mb-3">Fresh • Fast • Delicious</span>
      <h1 className="text-4xl md:text-6xl font-bold mb-4">Welcome to FoodHub</h1>
      <p className="text-lg md:text-2xl font-semibold mb-8">Discover the best food in Bhubaneswar</p>
      <button type="button" onClick={onExplore} className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition font-semibold">
        Explore Menu
      </button>
    </div>
  </section>
);

export default Hero;
