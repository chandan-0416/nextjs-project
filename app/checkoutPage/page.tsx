"use client";
import { useCart } from "@/app/context/CartContext";
import { useState } from "react";

export default function CheckoutPage() {
  const { cartItems, clearCart } = useCart();
  const [orderPlaced, setOrderPlaced] = useState(false);

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Simulate order placement
  const handleCheckout = () => {
    setOrderPlaced(true);
    clearCart();
  };

  if (orderPlaced) {
    return (
      <div className="max-w-2xl mx-auto mt-20 text-center">
        <h1 className="text-3xl font-bold mb-4 text-green-600">
          ✅ Order Placed Successfully!
        </h1>
        <p className="text-gray-600 mb-6">
          Thank you for shopping with us. Your order is being processed.
        </p>
        <a
          href="/product"
          className="bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700 transition"
        >
          Continue Shopping
        </a>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return <h2 className="text-center mt-20 text-xl">🛒 Your cart is empty</h2>;
  }

  return (
    <div className="max-w-5xl mx-auto p-10">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* 🧾 Order Summary */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          <ul className="space-y-4">
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

        {/* 🧍 Shipping Form */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Shipping Details</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleCheckout();
            }}
            className="space-y-4"
          >
            <div>
              <label className="block text-gray-700 font-medium">Full Name</label>
              <input
                type="text"
                required
                className="w-full border rounded-lg p-2 mt-1"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium">Email</label>
              <input
                type="email"
                required
                className="w-full border rounded-lg p-2 mt-1"
                placeholder="john@example.com"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium">Address</label>
              <textarea
                required
                className="w-full border rounded-lg p-2 mt-1"
                placeholder="123 Main St, City, Country"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium">Payment Method</label>
              <select required className="w-full border rounded-lg p-2 mt-1">
                <option value="">Select a payment method</option>
                <option value="credit">Credit / Debit Card</option>
                <option value="paypal">PayPal</option>
                <option value="cod">Cash on Delivery</option>
              </select>
            </div>

            <button
              type="submit"
              className="bg-green-600 text-white w-full py-2 rounded-lg mt-4 hover:bg-green-700 transition"
            >
              Place Order
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}


