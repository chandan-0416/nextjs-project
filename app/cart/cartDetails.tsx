"use client";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "../context/CartContext";

export default function CartPage() {
  const {
    cartItems,
    removeFromCart,
    clearCart,
    incrementQuantity,
    decrementQuantity,
  } = useCart();

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // 🧺 If cart is empty
  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col min-h-screen">
        <div className="flex-grow flex flex-col items-center justify-center">
          <h2 className="text-center text-2xl font-semibold mb-4">🛒 Your cart is empty</h2>
          <Link
            href="/product"
            className="text-blue-600 hover:underline flex items-center gap-2 text-lg"
          >
            ← Back to Products
          </Link>
        </div>
      </div>
    );
  }

  // 🛒 If cart has items
  return (
    <div className="max-w-4xl mx-auto p-10 min-h-screen flex flex-col">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

      <ul className="space-y-4 flex-grow">
        {cartItems.map((item) => (
          <li
            key={item.id}
            className="flex items-center justify-between border-b pb-4"
          >
            <div className="flex items-center gap-4">
           <Image
           src={item.thumbnail}
             alt={item.title}
             width={400}
             height={300}
            className="w-20 h-20 object-cover rounded-lg"
            />

              <div>
                <h3 className="font-semibold">{item.title}</h3>
                <p className="text-gray-600">${item.price}</p>

                {/* ➕➖ Quantity Controls */}
                <div className="flex items-center gap-2 mt-2">
                  <button
                    onClick={() => decrementQuantity(item.id)}
                    className="px-3 py-1 bg-gray-200 rounded-lg hover:bg-gray-300"
                  >
                    -
                  </button>
                  <span className="font-medium">{item.quantity}</span>
                  <button
                    onClick={() => incrementQuantity(item.id)}
                    className="px-3 py-1 bg-gray-200 rounded-lg hover:bg-gray-300"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            <div className="text-right">
              <p className="font-semibold">
                ${(item.price * item.quantity).toFixed(2)}
              </p>
              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-500 hover:underline text-sm"
              >
                Remove
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* 💰 Total Section */}
      <div className="flex justify-between mt-6 text-lg font-semibold">
        <span>Total:</span>
        <span>${total.toFixed(2)}</span>
      </div>

      {/* 🛍️ Buttons */}
      <div className="mt-auto flex justify-between">
        <button
          onClick={clearCart}
          className="bg-gray-200 px-5 py-2 rounded-lg hover:bg-gray-300"
        >
          Clear Cart
        </button>
        <Link
          href="/checkoutPage"
          className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700 transition"
        >
          Checkout
        </Link>
      </div>

      {/* 🦶 Sticky Footer */}
      <footer className="mt-auto bg-gray-100 text-center py-4 border-t">
       <footer />
      </footer>
    </div>
  );
}