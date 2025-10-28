"use client";

import Link from "next/link";
import { useCart } from "../context/CartContext";
export default function CartPage() {
  const { cartItems, removeFromCart, clearCart } = useCart();

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (cartItems.length === 0) {
    return <h2 className="text-center mt-20 text-xl">🛒 Your cart is empty</h2>;
  }

  return (
    <div className="max-w-4xl mx-auto p-10">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

      <ul className="space-y-4">
        {cartItems.map((item) => (
          <li
            key={item.id}
            className="flex items-center justify-between border-b pb-4"
          >
            <div className="flex items-center gap-4">
              <img
                src={item.thumbnail}
                alt={item.title}
                className="w-20 h-20 object-cover rounded-lg"
              />
              <div>
                <h3 className="font-semibold">{item.title}</h3>
                <p className="text-gray-600">
                  ${item.price} × {item.quantity}
                </p>
              </div>
            </div>

            <button
              onClick={() => removeFromCart(item.id)}
              className="text-red-500 hover:underline"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>

      <div className="flex justify-between mt-6 text-lg font-semibold">
        <span>Total:</span>
        <span>${total.toFixed(2)}</span>
      </div>

      <div className="mt-8 flex justify-between">
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
    </div>
  );
}
