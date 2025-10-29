/* eslint-disable @next/next/no-img-element */
"use client";

import { useCart } from "@/app/context/CartContext";

// 🧾 Define product type
type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  brand: string;
  category: string;
  thumbnail: string;
};

export default function ProductDetail({ product }: { product: Product }) {
  const { cartItems, addToCart } = useCart();

  if (!product) {
    return <p className="text-center mt-10 text-gray-600">Loading...</p>;
  }

  const handleAddToCart = () => {
    const existingItem = cartItems.find((item) => item.id === product.id);

    if (existingItem) {
      // If already exists, increase quantity by 1
      addToCart({
        ...product,
        quantity: existingItem.quantity + 1,
      });
    } else {
      // If new, add with quantity = 1
      addToCart({
        ...product,
        quantity: 1,
      });
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-full h-[400px] object-cover rounded-2xl shadow-lg"
        />

        <div>
          <h1 className="text-3xl font-bold mb-3">{product.title}</h1>
          <p className="text-gray-600 mb-4">{product.description}</p>

          <p className="text-lg text-gray-700">
            <span className="font-semibold">Brand:</span> {product.brand}
          </p>
          <p className="text-lg text-gray-700">
            <span className="font-semibold">Category:</span> {product.category}
          </p>

          <div className="text-2xl font-bold mt-4 mb-6">💰 ${product.price}</div>

          <button
            onClick={handleAddToCart}
            className="bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700 transition"
          >
            Add to Cart
          </button>
        </div>
      </div>

      <div className="mt-10">
        <a
          href="/product"
          className="text-blue-600 hover:underline flex items-center gap-2"
        >
          ← Back to Products
        </a>
      </div>
    </div>
  );
}
