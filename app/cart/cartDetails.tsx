"use client";

import Link from "next/link";
import Image from "next/image";
import Breadcrumbs from "@/app/components/breadcrumbs";
import { useCart } from "../context/CartContext";

export default function CartPage() {
  const {
    cartItems,
    removeFromCart,
    clearCart,
    incrementQuantity,
    decrementQuantity,
  } = useCart();

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  /* 🧺 If cart is empty */
  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col min-h-screen px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <div className="fixed max-w-4xl mt-4">
          <Breadcrumbs />
        </div>

        <div className="flex-grow flex flex-col items-center justify-center text-center">
          <h2 className="text-2xl sm:text-3xl font-semibold mb-4">
            🛒 Your cart is empty
          </h2>
        </div>
      </div>
    );
  }

  /* 🛒 Cart has items */
  return (
    <div className="flex flex-col min-h-screen px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto mt-6">
      {/* Breadcrumbs */}
      <div className="mt-6">
        <Breadcrumbs />
      </div>

      <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-center sm:text-left">
        Your Cart
      </h1>

      {/* Cart Items */}
      <ul className="space-y-6 flex-grow">
        {cartItems.map((item,index) => (
          <li
            key={`${item.id}-${index}`}
            className="flex flex-col sm:flex-row items-center sm:items-start justify-between border-b pb-4"
          >
            {/* Product Info */}
            <div className="flex w-full sm:w-2/3 items-center gap-4">
              <div className="relative w-24 h-24 sm:w-32 sm:h-32 flex-shrink-0">
                <Image
                  src={item.thumbnail}
                  alt={item.title}
                  fill
                  className="object-cover rounded-lg"
                  unoptimized
                />
              </div>

              <div className="flex flex-col flex-1">
                <h3 className="font-semibold text-lg">{item.title}</h3>
                <p className="text-gray-600 mt-1">${item.price}</p>

                {/* Quantity Controls */}
                <div className="flex items-center gap-2 mt-3">
                  <button
                    onClick={() => decrementQuantity(item.id)}
                    className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 transition"
                  >
                    -
                  </button>
                  <span className="font-medium">{item.quantity}</span>
                  <button
                    onClick={() => incrementQuantity(item.id)}
                    className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 transition"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Price & Remove */}
            <div className="mt-4 sm:mt-0 flex flex-col items-end w-full sm:w-1/3">
              <p className="font-semibold text-lg">
                ${(item.price * item.quantity).toFixed(2)}
              </p>
              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-500 hover:underline mt-2 text-sm"
              >
                Remove
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* Total Section */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-12 border-t pt-8">
        <span className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-0">
          Total: <span className="text-green-600">${total.toFixed(2)}</span>
        </span>

        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <button
            onClick={clearCart}
            className="w-full sm:w-auto bg-gray-200 px-5 py-3 rounded-lg hover:bg-gray-300 transition"
          >
            Clear Cart
          </button>
          <Link
            href="/checkoutPage"
            className="w-full sm:w-auto bg-green-600 text-white px-5 py-3 rounded-lg hover:bg-green-700 transition text-center"
          >
            Checkout
          </Link>
        </div>
      </div>

    </div>
  );
}
