"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import Breadcrumbs from "@/app/components/breadcrumbs";
import { useCart } from "@/app/context/CartContext";
import { useRouter } from "next/navigation";


type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  brand: string;
  category: string;
  thumbnail: string;
  images?: string[];
};

export default function ProductDetail({ product }: { product: Product }) {
  const { cartItems, addToCart } = useCart();
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const images: string[] =
    Array.isArray(product.images) && product.images.length > 0
      ? product.images
      : [product.thumbnail];

  const [selectedIdx, setSelectedIdx] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [lensStyle, setLensStyle] = useState({ backgroundPosition: "50% 50%" });
  const zoomRef = useRef<HTMLDivElement | null>(null);

  // Reset selected image on product change
  useEffect(() => {
    setSelectedIdx(0);
  }, [product?.id]);

  // Fetch related products
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

  // Add product to cart
  const handleAddToCart = () => {
    const existingItem = cartItems.find((item) => item.id === product.id);
    if (existingItem) {
      alert("This product is already in your cart!");
    } else {
      addToCart({ ...product, quantity: 1 });
      router.push("/cart");
    }
  };

  // Buy Now button (open checkout page with quantity = 1)
  const handleBuyNow = () => {
    const data = JSON.stringify({ ...product, quantity: 1 });
    const encoded = encodeURIComponent(data);
    window.open(`/checkoutPage?product=${encoded}`, "_blank");
  };

  // Zoom lens mouse move
  const onMouseMove = (e: React.MouseEvent) => {
    if (!zoomRef.current) return;
    const rect = zoomRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setLensStyle({ backgroundPosition: `${x}% ${y}%` });
  };

  if (!product) {
    return (
      <p className="text-center mt-10 text-lg bg-white dark:bg-gray-900 text-black dark:text-white">
        Loading product details...
      </p>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 bg-white dark:bg-gray-900 text-black dark:text-white">
      {/* Breadcrumbs */}
      <div className="mt-9">
        <Breadcrumbs />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mt-8">
        {/* LEFT: Images */}
        <div className="lg:col-span-7">
          <div className="lg:sticky lg:top-24 max-h-[calc(100vh-6rem)] overflow-y-auto">
            <div className="bg-white rounded-3xl p-6 shadow-xl border border-gray-100">
              {/* Thumbnail strip */}
              <div className="flex gap-2 overflow-x-auto pb-2 hide-scrollbar scroll-pl-4">
                {images.map((src, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedIdx(idx)}
                    aria-label={`Thumbnail ${idx + 1}`}
                    className={`flex-none w-20 h-20 rounded-lg overflow-hidden border-2 transition-transform ${
                      idx === selectedIdx
                        ? "border-blue-600 scale-105 shadow"
                        : "border-gray-200 hover:scale-105"
                    }`}
                  >
                    <div className="relative w-full h-full">
                      <Image
                        src={src}
                        alt={`${product.title} ${idx + 1}`}
                        fill
                        className="object-contain p-2 bg-white"
                        unoptimized
                      />
                    </div>
                  </button>
                ))}
              </div>

              {/* Main Image with Zoom */}
              <div
                className="relative w-full h-[540px] rounded-2xl overflow-hidden border bg-gray-50"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                onMouseMove={onMouseMove}
                ref={zoomRef}
              >
                <div className="absolute inset-0 transition-transform duration-500 will-change-transform">
                  <Image
                    src={images[selectedIdx]}
                    alt={product.title}
                    fill
                    className={`object-contain transition-transform duration-500 ${
                      isHovering ? "scale-[1.15]" : "scale-100"
                    }`}
                    unoptimized
                  />
                </div>

                {/* Zoom Lens */}
                <div
                  className={`hidden lg:block pointer-events-none absolute top-4 right-4 w-44 h-44 rounded-xl border border-gray-200 shadow-lg bg-white/60 backdrop-blur-md overflow-hidden transition-opacity ${
                    isHovering ? "opacity-100" : "opacity-0"
                  }`}
                  style={{
                    backgroundImage: `url(${images[selectedIdx]})`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: isHovering ? "220%" : "200%",
                    ...lensStyle,
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT: Details */}
        <div className="lg:col-span-5">
          <div className="bg-white rounded-3xl p-6 shadow-xl border border-gray-100">
            <h1 className="text-3xl font-extrabold text-gray-900">{product.title}</h1>
            <p className="text-gray-600 mt-4 leading-relaxed">{product.description}</p>

            <div className="mt-6 grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-500">Brand</p>
                <p className="font-semibold mt-1 text-gray-900">{product.brand}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Category</p>
                <p className="font-semibold mt-1 capitalize text-gray-900">{product.category}</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row sm:items-center gap-4">
              <button
                onClick={handleAddToCart}
                className="inline-flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl shadow-lg transition text-lg w-full sm:w-auto"
              >
                Add to Cart
              </button>

              <button
                onClick={handleBuyNow}
                className="inline-flex items-center justify-center px-6 py-3 border rounded-xl font-semibold text-gray-700 hover:shadow w-full sm:w-auto"
              >
                Buy Now
              </button>
            </div>

            {/* Related Products */}
            <div className="mt-8">
              <h2 className="text-2xl font-bold mb-4">Related Products</h2>
              {loading ? (
                <p className="text-gray-500">Loading related products...</p>
              ) : relatedProducts.length > 0 ? (
                <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-4">
                  {relatedProducts.map((item) => (
                    <Link
                      href={`/detailPage/${item.id}`}
                      key={item.id}
                      className="bg-white rounded-2xl p-4 shadow group hover:shadow-2xl transition transform hover:-translate-y-1 border border-gray-100"
                    >
                      <div className="relative w-full h-36 rounded-lg overflow-hidden mb-3 bg-gray-50 group-hover:backdrop-blur-sm group-hover:bg-white/60">
                        <Image
                          src={item.thumbnail}
                          alt={item.title}
                          fill
                          className="object-contain group-hover:scale-105 transition-transform duration-300"
                          unoptimized
                        />
                      </div>
                      <h3 className="font-semibold text-gray-900 truncate">{item.title}</h3>
                      <p className="text-sm text-gray-500 line-clamp-2 mt-1">{item.description}</p>
                      <div className="mt-3 flex items-center justify-between">
                        <span className="text-blue-600 font-bold">${item.price}</span>
                        <button className="text-sm px-3 py-1 border rounded-lg text-gray-700 hover:bg-gray-100">
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
        </div>
      </div>

      {/* MOBILE sticky buy bar */}
      <div className="fixed left-0 right-0 bottom-0 z-50 bg-white/95 backdrop-blur-sm border-t border-gray-200 p-3 sm:hidden">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-lg overflow-hidden bg-gray-50 border">
              <Image
                src={images[selectedIdx]}
                alt="mini"
                width={56}
                height={56}
                className="object-contain p-1"
                unoptimized
              />
            </div>
            <div>
              <div className="text-sm font-semibold text-gray-900">{product.title}</div>
              <div className="text-sm text-gray-500">${product.price}</div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleAddToCart}
              className="px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold"
            >
              Add to Cart
            </button>
            <button
              onClick={handleBuyNow}
              className="px-4 py-2 rounded-lg border font-semibold text-gray-700"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>

      {/* Helper styles */}
      <style>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}