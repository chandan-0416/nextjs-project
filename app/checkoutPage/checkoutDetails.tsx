"use client";

import { useCart } from "@/app/context/CartContext";
import { useState } from "react";
import Breadcrumbs from "@/app/components/breadcrumbs";
import { useSearchParams } from "next/navigation";

export default function CheckoutPage() {
  const {
    cartItems,
    clearCart,
    removeFromCart,
    incrementQuantity,
    decrementQuantity,
  } = useCart();

  const params = useSearchParams();
  const encoded = params.get("product");
  const mode = params.get("mode"); // ⭐ NEW (Detect cart checkout)
  const product = encoded ? JSON.parse(decodeURIComponent(encoded)) : null;

  const [orderPlaced, setOrderPlaced] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("");

  const handleCheckout = () => {
    setOrderPlaced(true);
    clearCart();
  };

  // ⭐ If Buy Now is NOT used AND mode is NOT cart → invalid page
  if (!product && mode !== "cart") {
    return (
      <div className="h-screen flex justify-center items-center text-xl">
        No Product Found
      </div>
    );
  }

  // ⭐ If cart checkout but cart empty
  if (mode === "cart" && cartItems.length === 0) {
    return (
      <div className="h-screen flex justify-center items-center text-xl">
        Cart is empty
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Breadcrumbs */}
      <div className="max-w-5xl mt-14 sm:px-6 lg:px-8">
        <Breadcrumbs />
      </div>

      <main className="flex-grow">
        {orderPlaced ? (
          // SUCCESS
          <div className="max-w-2xl mx-auto mt-20 text-center px-4 sm:px-6">
            <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-green-600">
              ✅ Order Placed Successfully!
            </h1>
            <p className="text-gray-600 mb-6">
              Thank you for shopping with us. Your order is being processed.
            </p>
            <a
              href="/product"
              className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition"
            >
              Continue Shopping
            </a>
          </div>
        ) : (
          // MAIN CHECKOUT PAGE
          <div className="mt-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">
            <h1 className="text-3xl sm:text-4xl font-bold mb-6">Checkout</h1>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              {/* ORDER SUMMARY */}
              <div className="bg-white p-6 rounded-xl shadow-md flex flex-col">
                <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

                <ul className="space-y-4 flex-grow max-h-[400px] overflow-y-auto">
                  {/* ⭐ IF Buy Now → show single product */}
                  {product &&
                    mode !== "cart" &&
                    [product].map((item, index) => (
                      <li
                        key={`${item.id}-${index}`}
                        className="flex items-center justify-between border-b pb-2"
                      >
                        <div>
                          <h3 className="font-medium">{item.title}</h3>
                          <p className="text-gray-600 text-sm">${item.price}</p>

                          {/* BUY NOW QTY */}
                          <div className="flex items-center gap-2 mt-2">
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

                        <div>
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

                  {/* ⭐ IF Cart Checkout → show all cart items */}
                  {mode === "cart" &&
                    cartItems.map((item, index) => (
                      <li
                        key={`${item.id}-${index}`}
                        className="flex items-center justify-between border-b pb-2"
                      >
                        <div>
                          <h3 className="font-medium">{item.title}</h3>
                          <p className="text-gray-600 text-sm">${item.price}</p>

                          <div className="flex items-center gap-2 mt-2">
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

                        <div>
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

                {/* ⭐ TOTAL CALCULATIONS */}
                <div className="flex justify-between mt-6 text-lg font-semibold">
                  <span>Total:</span>

                  {mode === "cart" ? (
                    <span>
                      $
                      {cartItems
                        .reduce(
                          (sum, item) => sum + item.price * item.quantity,
                          0
                        )
                        .toFixed(2)}
                    </span>
                  ) : (
                    <span>
                      ${(product.price * product.quantity).toFixed(2)}
                    </span>
                  )}
                </div>
              </div>

              {/* SHIPPING + PAYMENT (unchanged) */}
              <div className="bg-white p-6 rounded-xl shadow-md flex flex-col">
                <h2 className="text-xl font-semibold mb-4">Shipping Details</h2>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleCheckout();
                  }}
                  className="space-y-4"
                >
                  {/* FORM FIELDS (unchanged) */}
                  <div>
                    <label className="block text-gray-700 font-medium">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full border rounded-lg p-2 mt-1"
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-medium">
                      Email
                    </label>
                    <input
                      type="email"
                      required
                      className="w-full border rounded-lg p-2 mt-1"
                      placeholder="john@example.com"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-medium">
                      Address
                    </label>
                    <textarea
                      required
                      className="w-full border rounded-lg p-2 mt-1"
                      placeholder="123 Main St, City, Country"
                    />
                  </div>

                  {/* Payment Method */}
                  <div>
                    <label className="block text-gray-700 font-medium">
                      Payment Method
                    </label>
                    <select
                      required
                      value={paymentMethod}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="w-full border rounded-lg p-2 mt-1"
                    >
                      <option value="">Select a payment method</option>
                      <option value="credit">Credit / Debit Card</option>
                      <option value="paypal">PayPal</option>
                      <option value="cod">Cash on Delivery</option>
                    </select>
                  </div>

                  {/* Payment conditions (unchanged) */}

                  <button
                    type="submit"
                    className="bg-green-600 text-white w-full py-3 rounded-lg mt-4 hover:bg-green-700 transition"
                  >
                    Place Order
                  </button>
                </form>
              </div>

            </div>
          </div>
        )}
      </main>
    </div>
  );
}
