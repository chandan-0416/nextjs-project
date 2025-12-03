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
  // note: some APIs include images - we treat that as optional
  images?: string[];
};

export default function ProductDetail({ product }: { product: Product }) {
  const { cartItems, addToCart } = useCart();
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // --- UI state for gallery + zoom ---
  const images: string[] = Array.isArray(product.images) && product.images.length > 0
  ? product.images
  : [product.thumbnail];

  const [selectedIdx, setSelectedIdx] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [lensStyle, setLensStyle] = useState({ backgroundPosition: "50% 50%" });
  const zoomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // reset selected idx when product changes
    setSelectedIdx(0);
  }, [product?.id]);

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
       alert("This product is already in your cart!")
      // addToCart({ ...product, quantity: existingItem.quantity + 1 });
    } else {
      addToCart({ ...product, quantity: 1 });
      router.push("/cart");
    }
  };

  const handleBuyNow = () => {
  // Add item to cart (always quantity 1 for Buy Now)
  const existingItem = cartItems.find((item) => item.id === product.id);

  if (existingItem) {
    alert("This product is already in your cart!")
     return ; // ❗ stops further code, prevents navigation and duplicate add
    // addToCart({ ...product, quantity: existingItem.quantity + 1 });
  } 
  addToCart({ ...product, quantity: 1 });
  router.push("/checkoutPage"); 

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
      <p className="text-center mt-10 text-gray-600 text-lg">
        Loading product details...
      </p>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mt-9">
        <Breadcrumbs />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mt-8">
        {/* LEFT: Image + Gallery */}
        <div className="lg:col-span-7">
          {/* Make this sticky on large screens */}
          <div className="lg:sticky lg:top-24">
            <div className="bg-white rounded-3xl p-6 shadow-xl border border-gray-100">
              <div className="flex flex-col gap-4">
                {/* Horizontal thumbnail strip (Option B) */}
                <div className="flex gap-3 overflow-x-auto pb-2 hide-scrollbar">
                  {images.map((src: string, idx: number) => (
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

                {/* Main image area with zoom-on-hover lens */}
                <div
                  className="relative w-full h-[540px] rounded-2xl overflow-hidden border bg-gray-50"
                  onMouseEnter={() => setIsHovering(true)}
                  onMouseLeave={() => setIsHovering(false)}
                  onMouseMove={onMouseMove}
                  ref={zoomRef}
                >
                  {/* base image (slightly zooms on hover) */}
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

                  {/* magnifier lens only on large screens */}
                  <div
                    className={`hidden lg:block pointer-events-none absolute top-4 right-4 w-44 h-44 rounded-xl border border-gray-200 shadow-lg bg-white/60 backdrop-blur-md overflow-hidden transition-opacity ${
                      isHovering ? "opacity-100" : "opacity-0"
                    }`}
                    style={{
                      backgroundImage: `url(${images[selectedIdx]})`,
                      backgroundRepeat: "no-repeat",
                      backgroundSize: "220%",
                      ...lensStyle,
                    }}
                  />
                </div>

                {/* image caption / quick actions */}
                <div className="mt-4 flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">
                      {product.title}
                    </h2>
                    <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                      {product.brand} • <span className="capitalize">{product.category}</span>
                    </p>
                  </div>

                  <div className="text-right">
                    <div className="text-3xl font-extrabold text-emerald-600">
                      ${product.price}
                    </div>
                    <div className="text-sm text-gray-500 mt-1">Inclusive of taxes</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT: Details, actions, features */}
        <div className="lg:col-span-5">
          <div className="bg-white rounded-3xl p-6 shadow-xl border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-extrabold text-gray-900">
                  {product.title}
                </h1>
                <div className="flex items-center gap-3 mt-2">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className={`text-yellow-400 ${i < 4 ? "opacity-100" : "opacity-60"}`}
                      >
                        <path d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.787 1.402 8.173L12 18.896l-7.336 3.874 1.402-8.173L.132 9.21l8.2-1.192z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-sm text-gray-500">(120 reviews)</span>
                </div>
              </div>

              {/* subtle badge */}
              <div className="text-sm text-white font-semibold px-3 py-1 rounded-full bg-gradient-to-r from-emerald-500 to-green-600 shadow">
                Bestseller
              </div>
            </div>

            <p className="text-gray-600 mt-6 leading-relaxed">{product.description}</p>

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

            {/* primary actions */}
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

            {/* features */}
            <div className="mt-8 border-t pt-6">
              <h3 className="text-lg font-semibold text-gray-900">Why customers love it</h3>

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

            {/* meta */}
            <div className="mt-6 text-sm text-gray-500">
              <p>Free returns within 30 days • 2-year warranty available</p>
            </div>
          </div>

          {/* Animated / premium related products card container */}
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

      {/* MOBILE sticky buy bar */}
      <div className="fixed left-0 right-0 bottom-0 z-50 bg-white/95 backdrop-blur-sm border-t border-gray-200 p-3 sm:hidden">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-lg overflow-hidden bg-gray-50 border">
              <Image src={images[selectedIdx]} alt="mini" width={56} height={56} className="object-contain p-1" unoptimized />
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

            {/* <Link href="/checkoutPage" className="px-4 py-2 rounded-lg border font-semibold text-gray-700">
              Buy Now
            </Link> */}

          </div>
        </div>
      </div>

      {/* small helper styles (hide scrollbar on thumb strip) */}
      <style>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}


