import React from "react";
import { FaArrowRight } from "react-icons/fa";

const Category = ({ categories, selectedCategory, onSelectCategory }) => {
  return (
    <section id="categories" className="px-6 lg:px-20 py-10">
      <div className="flex items-end justify-between mb-6">
        <div>
          <p className="text-orange-500 font-semibold">Browse</p>
          <h2 className="text-3xl font-bold">Explore Categories</h2>
        </div>
        <button
          type="button"
          onClick={() => onSelectCategory("All")}
          className="hidden sm:flex items-center gap-2 text-orange-500 font-semibold hover:gap-3 transition-all"
        >
          View All <FaArrowRight />
        </button>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-3 snap-x">
        {categories.map((category) => {
          const active = selectedCategory === category.name;

          return (
            <button
              type="button"
              key={category.name}
              onClick={() => onSelectCategory(category.name)}
              aria-pressed={active}
              className={`min-w-36 sm:min-w-40 p-3 rounded-2xl border text-left snap-start transition-all ${
                active
                  ? "border-orange-500 bg-orange-50 shadow-md"
                  : "border-gray-200 bg-white hover:border-orange-300 hover:shadow-md"
              }`}
            >
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-24 object-cover rounded-xl"
                loading="lazy"
              />
              <div className="mt-2">
                <h3 className="font-semibold text-center">{category.name}</h3>
                <p className="text-xs text-gray-500 text-center">
                  {category.count} {category.count !== 1 ? "items" : "item"}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
};

export default Category;
