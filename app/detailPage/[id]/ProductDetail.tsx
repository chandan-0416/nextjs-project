
// "use client";

// import { useEffect, useState } from "react";
// import { useCart } from "@/app/context/CartContext";
// import Image from "next/image";
// import Link from "next/link";
// import axios from "axios";

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

//   // ⭐ Calculate total cart price
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
//       {/* ⭐ Product + Cart Preview Layout */}
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        
//         {/* 🔶 PRODUCT DETAILS */}
//         <div className="lg:col-span-2">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-10">
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
//               <p className="text-gray-600 leading-relaxed">{product.description}</p>

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

//               <Link
//                 href="/product"
//                 className="block mt-5 text-blue-600 hover:underline"
//               >
//                 ← Back to Products
//               </Link>
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

//               <Link
//                 href="/cart"
//                 className="mt-4 block bg-blue-600 text-white text-center py-2 rounded-lg hover:bg-blue-700 transition-all"
//               >
//                 View Full Cart →
//               </Link>
//             </div>
//           )}
//         </div>

//       </div>
//     </div>
//   );
// }


"use client";

import { useEffect, useState } from "react";
import { useCart } from "@/app/context/CartContext";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";

// ⭐ IMPORT YOUR BREADCRUMBS
import Breadcrumbs from "@/app/components/breadcrumbs";

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
      <p className="text-center mt-10 text-gray-600 text-lg">
        Loading product details...
      </p>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">

      {/* ⭐⭐⭐ ADD BREADCRUMBS HERE ⭐⭐⭐ */}
      <div className="mt-7">
        <Breadcrumbs/>
      </div>

      {/* ⭐ Product + Cart Preview Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

        {/* 🔶 PRODUCT DETAILS */}
        <div className="lg:col-span-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-4">
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
              <p className="text-gray-600 leading-relaxed">
                {product.description}
              </p>

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

            </div>
          </div>

          {/* 🔶 RELATED PRODUCTS */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">
              Related Products
            </h2>

            {loading ? (
              <p className="text-gray-500">Loading related products...</p>
            ) : relatedProducts.length > 0 ? (
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
            ) : (
              <p className="text-gray-500">No related products found.</p>
            )}
          </div>
        </div>

        {/* ⭐ RIGHT SIDE CART PREVIEW */}
        <div className="border rounded-2xl p-6 shadow-lg h-fit sticky top-24 bg-white">
          <h2 className="text-xl font-bold mb-4 text-gray-900">🛒 Your Cart</h2>

          {cartItems.length === 0 ? (
            <p className="text-gray-500">No items added yet.</p>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center gap-4 border-b pb-4">
                  <Image
                    src={item.thumbnail}
                    alt={item.title}
                    width={60}
                    height={60}
                    className="rounded object-cover"
                    unoptimized
                  />
                  <div>
                    <p className="font-semibold">{item.title}</p>
                    <p className="text-sm text-gray-600">
                      Qty: {item.quantity}
                    </p>
                    <p className="font-bold text-blue-600">
                      ${item.price * item.quantity}
                    </p>
                  </div>
                </div>
              ))}

              <div className="text-lg font-semibold text-green-700 pt-3">
                Total: ${totalPrice.toFixed(2)}
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

