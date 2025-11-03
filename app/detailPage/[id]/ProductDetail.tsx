"use client";

import { useEffect, useState } from "react";
import { useCart } from "@/app/context/CartContext";
import Image from "next/image";
import Link from "next/link";

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
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (!product?.category) return;

    // ✅ Fetch related products from same category
    async function fetchRelated() {
      try {
        const res = await fetch(
          `https://dummyjson.com/products/category/${product.category}`
        );
        if (!res.ok) throw new Error("Failed to load related products");
        const data = await res.json();
        // Exclude the current product from related list
        const filtered = data.products.filter(
          (p: Product) => p.id !== product.id
        );
        setRelatedProducts(filtered.slice(0, 4)); // Show top 4 related
      } catch (err) {
        console.error("Error fetching related:", err);
      }
    }

    fetchRelated();
  }, [product]);

  const handleAddToCart = () => {
    const existingItem = cartItems.find((item) => item.id === product.id);

    if (existingItem) {
      addToCart({ ...product, quantity: existingItem.quantity + 1 });
    } else {
      addToCart({ ...product, quantity: 1 });
    }
  };

  if (!product) {
    return (
      <p className="text-center mt-10 text-gray-600 text-lg">
        Loading product details...
      </p>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      {/* 🔹 Product Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start mt-16">
        <Image
          src={product.thumbnail}
          alt={product.title}
          width={500}
          height={400}
          className="w-full h-[420px] object-cover rounded-2xl shadow-lg"
          unoptimized
        />

        <div className="space-y-4">
          <h1 className="text-3xl font-bold text-gray-900">
            {product.title}
          </h1>
          <p className="text-gray-600 leading-relaxed">{product.description}</p>

          <p className="text-gray-800">
            <span className="font-semibold">Brand:</span> {product.brand}
          </p>
          <p className="text-gray-800">
            <span className="font-semibold">Category:</span> {product.category}
          </p>

          <div className="text-3xl font-semibold text-green-600 mt-3">
            ${product.price}
          </div>

          <button
            onClick={handleAddToCart}
            className="bg-blue-600 text-white px-8 py-2.5 rounded-lg hover:bg-blue-700 transition-all duration-200 shadow-md"
          >
            🛒 Add to Cart
          </button>

          <Link
            href="/product"
            className="block mt-5 text-blue-600 hover:underline"
          >
            ← Back to Products
          </Link>
        </div>
      </div>

      {/* 🔹 Related Products Section */}
      {relatedProducts.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">
            Related Products
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((item) => (
              <Link
                href={`/detailPage/${item.id}`}
                key={item.id}
                className="border rounded-xl p-4 shadow hover:shadow-md transition-all duration-200 group"
              >
                <div className="relative w-full h-48 mb-3">
                  <Image
                    src={item.thumbnail}
                    alt={item.title}
                    fill
                    className="object-cover rounded-lg group-hover:scale-105 transition-transform"
                    unoptimized
                  />
                </div>
                <h3 className="font-semibold text-gray-900 truncate">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600 line-clamp-2 mb-2">
                  {item.description}
                </p>
                <p className="font-bold text-blue-600">${item.price}</p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}