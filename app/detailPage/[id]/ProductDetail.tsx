"use client";

import { useCart } from "@/app/context/CartContext";

export default function ProductDetail({ product }: { product: any }) {
  const { addToCart } = useCart();

  if (!product) {
    return <p className="text-center mt-10 text-gray-600">Loading...</p>;
  }

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
            onClick={() =>
              addToCart({
                id: product.id,
                title: product.title,
                price: product.price,
                thumbnail: product.thumbnail,
                quantity: 1,
              })
            }
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
