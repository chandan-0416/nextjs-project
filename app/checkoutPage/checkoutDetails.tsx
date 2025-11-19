"use client";

import { useCart } from "@/app/context/CartContext";
import { useState } from "react";
import Breadcrumbs from "@/app/components/breadcrumbs";

export default function CheckoutPage() {
  const { cartItems, clearCart } = useCart();
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("");

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleCheckout = () => {
    setOrderPlaced(true);
    clearCart();
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Breadcrumbs */}
      <div className="max-w-5xl mx-auto mt-8 px-4 sm:px-6 lg:px-8">
        <Breadcrumbs />
      </div>

      <main className="flex-grow">
        {orderPlaced ? (
          // ✅ Order Success Message
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
        ) : cartItems.length === 0 ? (
          // 🛒 Empty Cart Message
          <h2 className="text-center mt-20 text-xl sm:text-2xl">
            🛒 Your cart is empty
          </h2>
        ) : (
          // 💳 Checkout Form + Order Summary
          <div className="mt-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">
            <h1 className="text-3xl sm:text-4xl font-bold mb-6">Checkout</h1>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              {/* 🧾 Order Summary */}
              <div className="bg-white p-6 rounded-xl shadow-md flex flex-col">
                <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                <ul className="space-y-4 flex-grow max-h-[400px] overflow-y-auto">
                  {cartItems.map((item) => (
                    <li
                      key={item.id}
                      className="flex items-center justify-between border-b pb-2"
                    >
                      <div>
                        <h3 className="font-medium">{item.title}</h3>
                        <p className="text-gray-600 text-sm">
                          ${item.price} × {item.quantity}
                        </p>
                      </div>
                      <p className="font-semibold">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </li>
                  ))}
                </ul>

                <div className="flex justify-between mt-6 text-lg font-semibold">
                  <span>Total:</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              {/* 🧍 Shipping & Payment Form */}
              <div className="bg-white p-6 rounded-xl shadow-md flex flex-col">
                <h2 className="text-xl font-semibold mb-4">Shipping Details</h2>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleCheckout();
                  }}
                  className="space-y-4"
                >
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

                  {/* Credit/Debit Card */}
                  {paymentMethod === "credit" && (
                    <div className="space-y-4 mt-4 border-t pt-4">
                      <h2 className="text-lg font-semibold text-gray-800">
                        Card Payment Details
                      </h2>
                      <div>
                        <label className="block text-gray-700 font-medium">
                          Card Number
                        </label>
                        <input
                          required
                          type="text"
                          maxLength={16}
                          placeholder="1234 5678 9012 3456"
                          className="w-full border rounded-lg p-2 mt-1"
                        />
                      </div>

                      <div className="flex gap-4">
                        <div className="w-1/2">
                          <label className="block text-gray-700 font-medium">
                            Expiry
                          </label>
                          <input
                            required
                            type="text"
                            placeholder="MM/YY"
                            className="w-full border rounded-lg p-2 mt-1"
                          />
                        </div>

                        <div className="w-1/2">
                          <label className="block text-gray-700 font-medium">
                            CVV
                          </label>
                          <input
                            required
                            type="password"
                            maxLength={3}
                            placeholder="123"
                            className="w-full border rounded-lg p-2 mt-1"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* PayPal */}
                  {paymentMethod === "paypal" && (
                    <div className="space-y-4 mt-4 border-t pt-4">
                      <h2 className="text-lg font-semibold text-gray-800">
                        PayPal Account
                      </h2>
                      <div>
                        <label className="block text-gray-700 font-medium">
                          Email
                        </label>
                        <input
                          required
                          type="email"
                          placeholder="you@example.com"
                          className="w-full border rounded-lg p-2 mt-1"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 font-medium">
                          Password
                        </label>
                        <input
                          required
                          type="password"
                          placeholder="********"
                          className="w-full border rounded-lg p-2 mt-1"
                        />
                      </div>
                    </div>
                  )}

                  {/* COD */}
                  {paymentMethod === "cod" && (
                    <div className="mt-4 text-green-700 font-medium border-t pt-4">
                      You can pay directly when your order is delivered. 💵
                    </div>
                  )}

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

      {/* Sticky Footer */}
      <footer className="bg-gray-900 text-white text-center py-4 mt-auto">
        © {new Date().getFullYear()} My Store — All rights reserved.
      </footer>
    </div>
  );
}
