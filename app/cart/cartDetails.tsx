// "use client";

// import Link from "next/link";
// import Image from "next/image";
// import Breadcrumbs from "@/app/components/breadcrumbs"; // ⭐ Correct import
// import { useCart } from "../context/CartContext";

// export default function CartPage() {
//   const {
//     cartItems,
//     removeFromCart,
//     clearCart,
//     incrementQuantity,
//     decrementQuantity,
//   } = useCart();

//   const total = cartItems.reduce(
//     (sum, item) => sum + item.price * item.quantity,
//     0
//   );

//   /* 🧺 If cart is empty */
//   if (cartItems.length === 0) {
//     return (
//       <div className="flex flex-col min-h-screen">
//         {/* ⭐ Breadcrumbs */}
//         <div className="max-w-4xl px-5 mt-6">
//           <Breadcrumbs />
//         </div>

//         <div className="flex-grow flex flex-col items-center justify-center">
//           <h2 className="text-center text-2xl font-semibold mb-4">
//             🛒 Your cart is empty
//           </h2>
//           <Link
//             href="/product"
//             className="text-blue-600 hover:underline flex items-center gap-2 text-lg"
//           >
//             ← Back to Products
//           </Link>
//         </div>
//       </div>
//     );
//   }

//   /* 🛒 Cart has items */
//   return (
//     <div className="mt-10 max-w-4xl mx-auto p-10 min-h-screen flex flex-col">
//       {/* ⭐ Breadcrumbs */}
//       <Breadcrumbs />

//       <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

//       <ul className="space-y-4 flex-grow">
//         {cartItems.map((item) => (
//           <li
//             key={item.id}
//             className="flex items-center justify-between border-b pb-4"
//           >
//             <div className="flex items-center gap-4">
//               <Image
//                 src={item.thumbnail}
//                 alt={item.title}
//                 width={80}
//                 height={80}
//                 className="w-20 h-20 object-cover rounded-lg"
//                 unoptimized
//               />

//               <div>
//                 <h3 className="font-semibold">{item.title}</h3>
//                 <p className="text-gray-600">${item.price}</p>

//                 {/* ➕➖ Quantity Controls */}
//                 <div className="flex items-center gap-2 mt-2">
//                   <button
//                     onClick={() => decrementQuantity(item.id)}
//                     className="px-3 py-1 bg-gray-200 rounded-lg hover:bg-gray-300"
//                   >
//                     -
//                   </button>

//                   <span className="font-medium">{item.quantity}</span>

//                   <button
//                     onClick={() => incrementQuantity(item.id)}
//                     className="px-3 py-1 bg-gray-200 rounded-lg hover:bg-gray-300"
//                   >
//                     +
//                   </button>
//                 </div>
//               </div>
//             </div>

//             <div className="text-right">
//               <p className="font-semibold">
//                 ${(item.price * item.quantity).toFixed(2)}
//               </p>
//               <button
//                 onClick={() => removeFromCart(item.id)}
//                 className="text-red-500 hover:underline text-sm"
//               >
//                 Remove
//               </button>
//             </div>
//           </li>
//         ))}
//       </ul>

//       {/* 💰 Total Section */}
//       <div className="flex justify-between mt-6 text-lg font-semibold">
//         <span>Total:</span>
//         <span>${total.toFixed(2)}</span>
//       </div>

//       {/* 🛍️ Buttons */}
//       <div className="mt-auto flex justify-between">
//         <button
//           onClick={clearCart}
//           className="bg-gray-200 px-5 py-2 rounded-lg hover:bg-gray-300"
//         >
//           Clear Cart
//         </button>
//         <Link
//           href="/checkoutPage"
//           className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700 transition"
//         >
//           Checkout
//         </Link>
//       </div>

//       {/* 🦶 Footer */}
//       <footer className="mt-auto bg-gray-100 text-center py-4 border-t">
//         <p className="text-gray-600 text-sm">
//           © {new Date().getFullYear()} My Store — All rights reserved.
//         </p>
//       </footer>
//     </div>
//   );
// }



"use client";

import Link from "next/link";
import Image from "next/image";
import Breadcrumbs from "@/app/components/breadcrumbs";
import { useCart } from "../context/CartContext";

export default function CartPage() {
  const {
    cartItems,
    removeFromCart,
    clearCart,
    incrementQuantity,
    decrementQuantity,
  } = useCart();

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  /* 🧺 If cart is empty */
  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col min-h-screen px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <div className="max-w-4xl mx-auto mt-6">
          <Breadcrumbs />
        </div>

        <div className="flex-grow flex flex-col items-center justify-center text-center">
          <h2 className="text-2xl sm:text-3xl font-semibold mb-4">
            🛒 Your cart is empty
          </h2>
          <Link
            href="/product"
            className="text-blue-600 hover:underline flex items-center gap-2 text-lg"
          >
            ← Back to Products
          </Link>
        </div>
      </div>
    );
  }

  /* 🛒 Cart has items */
  return (
    <div className="flex flex-col min-h-screen px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto mt-6">
      {/* Breadcrumbs */}
      <div className="mt-6">
        <Breadcrumbs />
      </div>

      <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-center sm:text-left">
        Your Cart
      </h1>

      {/* Cart Items */}
      <ul className="space-y-6 flex-grow">
        {cartItems.map((item) => (
          <li
            key={item.id}
            className="flex flex-col sm:flex-row items-center sm:items-start justify-between border-b pb-4"
          >
            {/* Product Info */}
            <div className="flex w-full sm:w-2/3 items-center gap-4">
              <div className="relative w-24 h-24 sm:w-32 sm:h-32 flex-shrink-0">
                <Image
                  src={item.thumbnail}
                  alt={item.title}
                  fill
                  className="object-cover rounded-lg"
                  unoptimized
                />
              </div>

              <div className="flex flex-col flex-1">
                <h3 className="font-semibold text-lg">{item.title}</h3>
                <p className="text-gray-600 mt-1">${item.price}</p>

                {/* Quantity Controls */}
                <div className="flex items-center gap-2 mt-3">
                  <button
                    onClick={() => decrementQuantity(item.id)}
                    className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 transition"
                  >
                    -
                  </button>
                  <span className="font-medium">{item.quantity}</span>
                  <button
                    onClick={() => incrementQuantity(item.id)}
                    className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 transition"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Price & Remove */}
            <div className="mt-4 sm:mt-0 flex flex-col items-end w-full sm:w-1/3">
              <p className="font-semibold text-lg">
                ${(item.price * item.quantity).toFixed(2)}
              </p>
              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-500 hover:underline mt-2 text-sm"
              >
                Remove
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* Total Section */}
      <div className="flex flex-col sm:flex-row justify-between items-center mt-8 border-t pt-6">
        <span className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-0">
          Total: <span className="text-green-600">${total.toFixed(2)}</span>
        </span>

        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <button
            onClick={clearCart}
            className="w-full sm:w-auto bg-gray-200 px-5 py-3 rounded-lg hover:bg-gray-300 transition"
          >
            Clear Cart
          </button>
          <Link
            href="/checkoutPage"
            className="w-full sm:w-auto bg-green-600 text-white px-5 py-3 rounded-lg hover:bg-green-700 transition text-center"
          >
            Checkout
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-12 bg-gray-100 text-center py-4 border-t">
        <p className="text-gray-600 text-sm">
          © {new Date().getFullYear()} My Store — All rights reserved.
        </p>
      </footer>
    </div>
  );
}
