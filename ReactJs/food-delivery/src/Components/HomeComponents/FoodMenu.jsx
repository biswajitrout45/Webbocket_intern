import React from "react";
import { FaPlus, FaMinus, FaStar } from "react-icons/fa";

const FoodMenu = ({ items, cart, onAdd, onRemove, selectedCategory }) => {
  return (
    <section id="menu" className="px-6 lg:px-20 py-10 bg-gray-50">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3 mb-6">
        <div>
          <p className="text-orange-500 font-semibold">Our Menu</p>
          <h2 className="text-3xl font-bold">
            {selectedCategory === "All" ? "Popular Food" : selectedCategory}
          </h2>
        </div>
        <p className="text-gray-500">
          {items.length} {items.length !== 1 ? "items" : "item"} available
        </p>
      </div>

      {items.length === 0 ? (
        <div className="rounded-xl bg-white p-10 text-center shadow-sm">
          <h3 className="text-xl font-semibold">No food found</h3>
          <p className="text-gray-500 mt-2">Try another category.</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {items.map((food) => {
            const quantity = cart[food.id] || 0;

            return (
              <article
                key={food.id}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition"
              >
                <div className="relative">
                  <img
                    src={food.image}
                    alt={food.name}
                    className="w-full h-52 object-cover"
                    loading="lazy"
                  />
                  <span
                    className={`absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-semibold ${food.isVeg ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
                  >
                    {food.isVeg ? "VEG" : "NON-VEG"}
                  </span>
                </div>

                <div className="p-4">
                  <div className="flex justify-between gap-3">
                    <h3 className="font-bold text-lg">{food.name}</h3>
                    <span className="font-bold text-orange-500 whitespace-nowrap">
                      ₹{food.price}
                    </span>
                  </div>

                  <p className="text-sm text-gray-500 mt-2 line-clamp-2">
                    {food.description}
                  </p>

                  <div className="flex items-center justify-between mt-4">
                    <span className="flex items-center gap-1 text-sm">
                      <FaStar className="text-yellow-400" />
                      {food.rating}
                    </span>

                    {quantity === 0 ? (
                      <button
                        type="button"
                        onClick={() => onAdd(food)}
                        className="flex items-center gap-2 bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition"
                      >
                        <FaPlus /> Add
                      </button>
                    ) : (
                      <div className="flex items-center gap-3 border rounded-lg px-2 py-1">
                        <button
                          type="button"
                          onClick={() => onRemove(food.id)}
                          className="p-2 hover:text-orange-500"
                        >
                          <FaMinus />
                        </button>
                        <span className="font-semibold min-w-4 text-center">
                          {quantity.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => onAdd(food)}
                          className="p-2 hover:text-orange-500"
                        >
                          <FaPlus />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default FoodMenu;
