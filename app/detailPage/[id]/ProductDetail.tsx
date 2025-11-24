"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import Breadcrumbs from "@/app/components/breadcrumbs";
import { useCart } from "@/app/context/CartContext";

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
  const { cartItems, addToCart, removeFromCart } = useCart();
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!product?.category) return;

    const fetchRelated = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `https://dummyjson.com/products/category/${product.category}`
        );
        const data = res.data.products;
        const filtered = data.filter((p: Product) => p.id !== product.id);
        setRelatedProducts(filtered.slice(0, 4));
      } catch (err) {
        console.error("Error fetching related products:", err);
      } finally {
        setLoading(false);
      }
    };

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

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (!product) {
    return (
      <p className="text-center mt-10 text-gray-600 text-lg">
        Loading product details...
      </p>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <div className="mt-6">
        <Breadcrumbs />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

        {/* LEFT CONTENT */}
        <div className="lg:col-span-7">
          <div className="bg-white rounded-2xl p-6 shadow-xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
              <div className="flex items-center justify-center">
                <div className="relative w-full max-w-[520px] h-[520px] rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src={product.thumbnail}
                    alt={product.title}
                    fill
                    className="object-contain bg-white"
                    unoptimized
                  />
                </div>
              </div>

              {/* PRODUCT DETAILS */}
              <div className="py-2">
                <h1 className="text-4xl font-extrabold text-gray-900">
                  {product.title}
                </h1>

                <div className="flex items-center gap-3 mt-3">
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <svg
                        key={i}
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className={`text-yellow-400 ${
                          i < 4 ? "opacity-100" : "opacity-60"
                        }`}
                      >
                        <path d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.787 1.402 8.173L12 18.896l-7.336 3.874 1.402-8.173L.132 9.21l8.2-1.192z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-sm text-gray-500">(120 reviews)</span>
                </div>

                <p className="text-gray-600 mt-6">{product.description}</p>

                <div className="mt-6 grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium">Brand</p>
                    <p className="font-semibold mt-1">{product.brand}</p>
                  </div>

                  <div>
                    <p className="text-sm font-medium">Category</p>
                    <p className="font-semibold mt-1 capitalize">
                      {product.category}
                    </p>
                  </div>
                </div>

                <div className="mt-6 flex items-center gap-6">
                  <div className="text-3xl font-extrabold text-emerald-600">
                    ${product.price}
                  </div>
                </div>

                <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:gap-4">
                  <button
                    onClick={handleAddToCart}
                    className="inline-flex items-center gap-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl shadow-lg transition"
                  >
                    Add to Cart
                  </button>

                  <Link
                    href="/checkoutPage"
                    className="mt-3 sm:mt-0 inline-flex items-center justify-center px-6 py-3 border rounded-xl font-semibold text-gray-700 hover:shadow-md w-full sm:w-auto"
                  >
                    Buy Now
                  </Link>
                </div>

                {/* Features, badges, etc. (unchanged) */}

                <div className="mt-8 border-t pt-6">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Why customers love it
                  </h3>

                  <ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-gray-600">
                    <li className="flex items-start gap-3">
                      <span className="mt-1 text-emerald-600">✔</span>
                      <div>
                        <p className="font-semibold">Volumizing formula</p>
                        <p className="text-sm">Builds dramatic volume.</p>
                      </div>
                    </li>

                    <li className="flex items-start gap-3">
                      <span className="mt-1 text-emerald-600">✔</span>
                      <div>
                        <p className="font-semibold">Long-lasting</p>
                        <p className="text-sm">No smudging all day.</p>
                      </div>
                    </li>

                    <li className="flex items-start gap-3">
                      <span className="mt-1 text-emerald-600">✔</span>
                      <div>
                        <p className="font-semibold">Cruelty-free</p>
                        <p className="text-sm">No animal testing.</p>
                      </div>
                    </li>

                    <li className="flex items-start gap-3">
                      <span className="mt-1 text-emerald-600">✔</span>
                      <div>
                        <p className="font-semibold">Easy application</p>
                        <p className="text-sm">Smooth precision brush.</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* RELATED PRODUCTS (unchanged) */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6">Related Products</h2>

            {loading ? (
              <p className="text-gray-500">Loading related products...</p>
            ) : relatedProducts.length > 0 ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedProducts.map((item) => (
                  <Link
                    href={`/detailPage/${item.id}`}
                    key={item.id}
                    className="bg-white rounded-2xl p-4 shadow hover:shadow-xl transition group"
                  >
                    <div className="relative w-full h-44 rounded-lg overflow-hidden mb-3">
                      <Image
                        src={item.thumbnail}
                        alt={item.title}
                        fill
                        className="object-contain group-hover:scale-105 transition-transform"
                        unoptimized
                      />
                    </div>

                    <h3 className="font-semibold text-gray-900 truncate">
                      {item.title}
                    </h3>

                    <p className="text-sm text-gray-500 line-clamp-2 mt-1">
                      {item.description}
                    </p>

                    <div className="mt-3 flex items-center justify-between">
                      <span className="text-blue-600 font-bold">
                        ${item.price}
                      </span>

                      <button className="text-sm px-3 py-1 border rounded-lg text-gray-700">
                        Quick view
                      </button>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No related products found.</p>
            )}
          </div>
        </div>

        {/* RIGHT STICKY CART */}
        <aside className="lg:col-span-5">
          <div className="sticky top-24">
            <div className="bg-white border rounded-2xl p-6 shadow-xl">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Your Cart</h3>
                <span className="text-sm text-gray-500">
                  {cartItems.length} items
                </span>
              </div>

              <div className="mt-4">
                {cartItems.length === 0 ? (
                  <p className="text-gray-500">No items added yet.</p>
                ) : (
                  <div className="space-y-4">
                    {cartItems.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center gap-4"
                      >
                        <div className="w-16 h-16 relative rounded overflow-hidden border">
                          <Image
                            src={item.thumbnail}
                            alt={item.title}
                            fill
                            className="object-cover"
                            unoptimized
                          />
                        </div>

                        <div className="flex-1">
                          <p className="font-semibold text-gray-900">
                            {item.title}
                          </p>
                          <p className="text-sm text-gray-500">
                            Qty: {item.quantity}
                          </p>

                          {/* 🔥 ADDED REMOVE BUTTON */}
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-red-500 text-sm hover:underline mt-1"
                          >
                            Remove
                          </button>
                        </div>

                        <div className="text-right">
                          <p className="font-bold text-blue-600">
                            ${(item.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    ))}

                    <div className="pt-4 border-t">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600 font-medium">
                          Subtotal
                        </span>
                        <span className="font-bold text-green-700">
                          ${totalPrice.toFixed(2)}
                        </span>
                      </div>

                      <Link
                        href="/checkoutPage"
                        className="mt-4 block w-full text-center bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold"
                      >
                        Checkout
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </div>

          </div>
        </aside>
      </div>
    </div>
  );
}
