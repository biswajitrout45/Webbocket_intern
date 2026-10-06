import React from "react";
import { FaMinus, FaPlus, FaTrash, FaTimes } from "react-icons/fa";

const Cart = ({ items, onAdd, onRemove, onClear, isOpen, onClose }) => {
  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      <button
        aria-label="Close cart"
        onClick={onClose}
        className="absolute inset-0 bg-black/70 cursor-default"
      />
      <aside className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl p-5 flex flex-col">
        <div className="flex items-center justify-between border-b pb-4">
          <h2 className="text-2xl font-bold">Your Cart</h2>
          <button onClick={onClose} className="p-2 hover:text-orange-500">
            <FaTimes />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-4 space-y-4">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-gray-500">
              <FaTrash className="text-3xl mb-3" />
              <p>Your cart is empty.</p>
              <button
                onClick={onClose}
                className="mt-4 text-orange-500 font-semibold"
              >
                Continue shopping
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex gap-3">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <div className="flex justify-between gap-2">
                    <h3 className="font-semibold">{item.name}</h3>
                    <span className="font-semibold">
                      ₹{item.price * item.quantity}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500">₹{item.price} each</p>
                  <div className="flex items-center gap-3 mt-2">
                    <button
                      onClick={() => onRemove(item.id)}
                      className="border rounded p-1"
                    >
                      <FaMinus size={10} />
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => onAdd(item)}
                      className="border rounded p-1"
                    >
                      <FaPlus size={10} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="border-t pt-4">
          <div className="flex justify-between text-lg font-bold mb-4">
            <span>Total</span>
            <span>₹{total}</span>
          </div>
          <button
            disabled={items.length === 0}
            className="w-full py-3 rounded-lg bg-orange-500 text-white font-semibold hover:bg-orange-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
            onClick={() => {
              alert("Order placed!");
              onClear();
            }}
          >
            Proceed to Checkout
          </button>
          {items.length > 0 && (
            <button
              onClick={onClear}
              className="w-full mt-2 py-2 text-red-500 text-sm"
            >
              Clear Cart
            </button>
          )}
        </div>
      </aside>
    </div>
  );
};

export default Cart;
