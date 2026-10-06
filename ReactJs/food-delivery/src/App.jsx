import React, { useMemo, useState } from "react";
import Navbar from "./Components/Navbar/Navbar";
import Home from "./Screens/Home";
import foodItems from "./assets/data";
import Cart from "./Components/Cart";

const App = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [cart, setCart] = useState({});
  const [cartOpen, setCartOpen] = useState(false);

  const categories = useMemo(() => {
    const seen = new Set();

    return [
      { name: "All", image: foodItems[0]?.image, count: foodItems.length },
      ...foodItems.reduce((result, item) => {
        // console.log(item);

        if (!seen.has(item.category)) {
          seen.add(item.category);
          result.push({
            name: item.category,
            image: item.image,
            count: foodItems.filter((food) => food.category === item.category)
              .length,
          });
        }
        return result;
      }, []),
    ];
  }, []);

  const filteredItems = useMemo(
    () =>
      selectedCategory === "All"
        ? foodItems
        : foodItems.filter((food) => food.category === selectedCategory),
    [selectedCategory],
  );

  const addToCart = (food) => {
    setCart((current) => ({
      ...current,
      [food.id]: { ...food, quantity: (current[food.id]?.quantity || 0) + 1 },
    }));
  };

  const removeFromCart = (id) => {
    setCart((current) => {
      const next = { ...current };
      if (!next[id]) return current;
      if (next[id].quantity === 1) delete next[id];
      else next[id] = { ...next[id], quantity: next[id].quantity - 1 };
      return next;
    });
  };

  const clearCart = () => setCart({});

  const cartItems = Object.values(cart);
  console.log(cartItems);

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const selectCategory = (category) => {
    setSelectedCategory(category);
    requestAnimationFrame(() =>
      document.getElementById("menu")?.scrollIntoView({ behavior: "smooth" }),
    );
  };

  return (
    <>
      <Navbar cartCount={cartCount} onCartClick={() => setCartOpen(true)} />
      <Home
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={selectCategory}
        foodItems={filteredItems}
        cart={cart}
        onAdd={addToCart}
        onRemove={removeFromCart}
      />
      <Cart
        items={cartItems}
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        onAdd={addToCart}
        onRemove={removeFromCart}
        onClear={clearCart}
      />
    </>
  );
};

export default App;
