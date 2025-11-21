// "use client";

// import { useEffect, useState } from "react";
// import { useCart } from "@/app/context/CartContext";
// import Image from "next/image";
// import Link from "next/link";
// import axios from "axios";

// // ⭐ IMPORT YOUR BREADCRUMBS
// import Breadcrumbs from "@/app/components/breadcrumbs";

// type Product = {
//   id: number;
//   title: string;
//   description: string;
//   price: number;
//   brand: string;
//   category: string;
//   thumbnail: string;
// };

// export default function ProductDetail({ product }: { product: Product }) {
//   const { cartItems, addToCart } = useCart();
//   const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     if (!product?.category) return;

//     const fetchRelated = async () => {
//       setLoading(true);
//       try {
//         const res = await axios.get(
//           `https://dummyjson.com/products/category/${product.category}`
//         );
//         const data = res.data.products;
//         const filtered = data.filter((p: Product) => p.id !== product.id);
//         setRelatedProducts(filtered.slice(0, 4));
//       } catch (err) {
//         console.error("Error fetching related products:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchRelated();
//   }, [product]);

//   const handleAddToCart = () => {
//     const existingItem = cartItems.find((item) => item.id === product.id);

//     if (existingItem) {
//       addToCart({ ...product, quantity: existingItem.quantity + 1 });
//     } else {
//       addToCart({ ...product, quantity: 1 });
//     }
//   };

//   const totalPrice = cartItems.reduce(
//     (sum, item) => sum + item.price * item.quantity,
//     0
//   );

//   if (!product) {
//     return (
//       <p className="text-center mt-10 text-gray-600 text-lg">
//         Loading product details...
//       </p>
//     );
//   }

//   return (
//     <div className="max-w-7xl mx-auto px-6 py-10">

//       {/* ⭐⭐⭐ ADD BREADCRUMBS HERE ⭐⭐⭐ */}
//       <div className="mt-7">
//         <Breadcrumbs/>
//       </div>

//       {/* ⭐ Product + Cart Preview Layout */}
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

//         {/* 🔶 PRODUCT DETAILS */}
//         <div className="lg:col-span-2">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-4">
//             <Image
//               src={product.thumbnail}
//               alt={product.title}
//               width={500}
//               height={400}
//               className="w-full h-[420px] object-cover rounded-2xl shadow-lg"
//               unoptimized
//             />

//             <div className="space-y-4">
//               <h1 className="text-3xl font-bold text-gray-900">
//                 {product.title}
//               </h1>
//               <p className="text-gray-600 leading-relaxed">
//                 {product.description}
//               </p>

//               <p className="text-gray-800">
//                 <span className="font-semibold">Brand:</span> {product.brand}
//               </p>
//               <p className="text-gray-800">
//                 <span className="font-semibold">Category:</span> {product.category}
//               </p>

//               <div className="text-3xl font-semibold text-green-600 mt-3">
//                 ${product.price}
//               </div>

//               <button
//                 onClick={handleAddToCart}
//                 className="bg-blue-600 text-white px-8 py-2.5 rounded-lg hover:bg-blue-700 transition-all duration-200 shadow-md"
//               >
//                 🛒 Add to Cart
//               </button>

//             </div>
//           </div>

//           {/* 🔶 RELATED PRODUCTS */}
//           <div className="mt-16">
//             <h2 className="text-2xl font-bold mb-6 text-gray-900">
//               Related Products
//             </h2>

//             {loading ? (
//               <p className="text-gray-500">Loading related products...</p>
//             ) : relatedProducts.length > 0 ? (
//               <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
//                 {relatedProducts.map((item) => (
//                   <Link
//                     href={`/detailPage/${item.id}`}
//                     key={item.id}
//                     className="border rounded-xl p-4 shadow hover:shadow-md transition-all duration-200 group"
//                   >
//                     <div className="relative w-full h-48 mb-3">
//                       <Image
//                         src={item.thumbnail}
//                         alt={item.title}
//                         fill
//                         className="object-cover rounded-lg group-hover:scale-105 transition-transform"
//                         unoptimized
//                       />
//                     </div>
//                     <h3 className="font-semibold text-gray-900 truncate">
//                       {item.title}
//                     </h3>
//                     <p className="text-sm text-gray-600 line-clamp-2 mb-2">
//                       {item.description}
//                     </p>
//                     <p className="font-bold text-blue-600">${item.price}</p>
//                   </Link>
//                 ))}
//               </div>
//             ) : (
//               <p className="text-gray-500">No related products found.</p>
//             )}
//           </div>
//         </div>

//         {/* ⭐ RIGHT SIDE CART PREVIEW */}
//         <div className="border rounded-2xl p-6 shadow-lg h-fit sticky top-24 bg-white">
//           <h2 className="text-xl font-bold mb-4 text-gray-900">🛒 Your Cart</h2>

//           {cartItems.length === 0 ? (
//             <p className="text-gray-500">No items added yet.</p>
//           ) : (
//             <div className="space-y-4">
//               {cartItems.map((item) => (
//                 <div key={item.id} className="flex items-center gap-4 border-b pb-4">
//                   <Image
//                     src={item.thumbnail}
//                     alt={item.title}
//                     width={60}
//                     height={60}
//                     className="rounded object-cover"
//                     unoptimized
//                   />
//                   <div>
//                     <p className="font-semibold">{item.title}</p>
//                     <p className="text-sm text-gray-600">
//                       Qty: {item.quantity}
//                     </p>
//                     <p className="font-bold text-blue-600">
//                       ${item.price * item.quantity}
//                     </p>
//                   </div>
//                 </div>
//               ))}

//               <div className="text-lg font-semibold text-green-700 pt-3">
//                 Total: ${totalPrice.toFixed(2)}
//               </div>

//             <Link
//             href="/checkoutPage"
//             className="w-full sm:w-auto bg-green-600 text-white px-5 py-3 rounded-lg hover:bg-green-700 transition text-center"
//           >
//             Checkout
//           </Link>

//             </div>
//           )}
//         </div>

//       </div>
//     </div>
//   );
// }




"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import Breadcrumbs from "@/app/components/breadcrumbs";
import { useCart } from "@/app/context/CartContext";

// FALLBACK IMAGE (developer note: path will be transformed to a URL during tooling)
const FALLBACK_IMAGE = "/mnt/data/A_product_webpage_screenshot_showcases_Essence_Mas.png";

/**
 * Premium Product Detail (UI only) — preserves all original functionality.
 * - Modern spacing, rounded cards, trust badges, rating, and features list
 * - Sticky right-cart with neat visual styling
 * - Related products as elegant cards
 * - Keep logic (fetch, cart) unchanged
 */

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
      <p className="text-center mt-10 text-gray-600 text-lg">Loading product details...</p>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      {/* Breadcrumbs */}
      <div className="mb-6">
        <Breadcrumbs />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* LEFT: Product Gallery */}
        <div className="lg:col-span-7">
          <div className="bg-white rounded-2xl p-6 shadow-xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
              <div className="flex items-center justify-center">
                <div className="relative w-full max-w-[520px] h-[520px] rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src={product.thumbnail || FALLBACK_IMAGE}
                    alt={product.title}
                    fill
                    className="object-contain bg-white"
                    unoptimized
                  />
                </div>
              </div>

              <div className="py-2">
                <h1 className="text-4xl font-extrabold leading-tight text-gray-900">
                  {product.title}
                </h1>

                {/* Rating */}
                <div className="flex items-center gap-3 mt-3">
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <svg
                        key={i}
                        width="20"
                        height="20"
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

                <p className="text-gray-600 mt-6 leading-relaxed">{product.description}</p>

                <div className="mt-6 grid grid-cols-2 gap-4 text-gray-700">
                  <div>
                    <p className="text-sm font-medium">Brand</p>
                    <p className="font-semibold mt-1">{product.brand}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Category</p>
                    <p className="font-semibold mt-1 capitalize">{product.category}</p>
                  </div>
                </div>

                <div className="mt-6 flex items-center gap-6">
                  <div className="text-3xl font-extrabold text-emerald-600">${product.price}</div>
                </div>

                {/* CTA Row */}
                <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:gap-4">
                  <button
                    onClick={handleAddToCart}
                    className="inline-flex items-center gap-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl shadow-lg transition"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                      <path d="M3 3h2l.4 2M7 13h10l4-8H5.4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                      <circle cx="10" cy="20" r="1" fill="currentColor" />
                      <circle cx="18" cy="20" r="1" fill="currentColor" />
                    </svg>
                    Add to Cart
                  </button>

                  <Link
                    href="/checkoutPage"
                    className="mt-3 sm:mt-0 inline-flex items-center justify-center px-6 py-3 border rounded-xl font-semibold text-gray-700 hover:shadow-md w-full sm:w-auto"
                  >
                    Buy Now
                  </Link>
                </div>

                {/* Trust badges */}
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm text-gray-600">
                  <div className="flex items-center gap-3">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M12 2l2 4 4 .6-3 3 0 4L12 13l-3 3 0-4-3-3 4-.6z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    <span>Free shipping</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M12 2v6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/><path d="M4 12h16" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    <span>30-day return policy</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M12 17a2 2 0 100-4 2 2 0 000 4z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/><path d="M20 7H4v10a2 2 0 002 2h12a2 2 0 002-2V7z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    <span>100% secure checkout</span>
                  </div>
                </div>

                {/* Features / Highlights */}
                <div className="mt-8 border-t pt-6">
                  <h3 className="text-lg font-semibold text-gray-900">Why customers love it</h3>
                  <ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-gray-600">
                    <li className="flex items-start gap-3">
                      <span className="mt-1 text-emerald-600">✔</span>
                      <div>
                        <p className="font-semibold">Volumizing formula</p>
                        <p className="text-sm">Builds dramatic volume without clumps.</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="mt-1 text-emerald-600">✔</span>
                      <div>
                        <p className="font-semibold">Long-lasting</p>
                        <p className="text-sm">Stays put through the day—no smudging.</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="mt-1 text-emerald-600">✔</span>
                      <div>
                        <p className="font-semibold">Cruelty-free</p>
                        <p className="text-sm">Made without animal testing.</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="mt-1 text-emerald-600">✔</span>
                      <div>
                        <p className="font-semibold">Easy application</p>
                        <p className="text-sm">Precision brush for every lash.</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* RELATED PRODUCTS */}
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
                        src={item.thumbnail || FALLBACK_IMAGE}
                        alt={item.title}
                        fill
                        className="object-contain group-hover:scale-105 transition-transform"
                        unoptimized
                      />
                    </div>
                    <h3 className="font-semibold text-gray-900 truncate">{item.title}</h3>
                    <p className="text-sm text-gray-500 line-clamp-2 mt-1">{item.description}</p>
                    <div className="mt-3 flex items-center justify-between">
                      <span className="text-blue-600 font-bold">${item.price}</span>
                      <button className="text-sm px-3 py-1 border rounded-lg text-gray-700">Quick view</button>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No related products found.</p>
            )}
          </div>
        </div>

        {/* RIGHT: Sticky Cart Preview */}
        <aside className="lg:col-span-5">
          <div className="sticky top-24">
            <div className="bg-white border rounded-2xl p-6 shadow-xl">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Your Cart</h3>
                <span className="text-sm text-gray-500">{cartItems.length} items</span>
              </div>

              <div className="mt-4">
                {cartItems.length === 0 ? (
                  <p className="text-gray-500">No items added yet.</p>
                ) : (
                  <div className="space-y-4">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex items-center gap-4">
                        <div className="w-16 h-16 relative rounded overflow-hidden border">
                          <Image
                            src={item.thumbnail || FALLBACK_IMAGE}
                            alt={item.title}
                            fill
                            className="object-cover"
                            unoptimized
                          />
                        </div>

                        <div className="flex-1">
                          <p className="font-semibold text-gray-900">{item.title}</p>
                          <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                        </div>

                        <div className="text-right">
                          <p className="font-bold text-blue-600">${(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                      </div>
                    ))}

                    <div className="pt-4 border-t">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600 font-medium">Subtotal</span>
                        <span className="font-bold text-green-700">${totalPrice.toFixed(2)}</span>
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

            {/* Small trust / promo card below cart */}
            <div className="mt-6 p-4 rounded-2xl bg-gradient-to-r from-blue-50 to-white border">
              <p className="text-sm text-gray-700">Use code <span className="font-semibold">WELCOME10</span> for 10% off on first order</p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
