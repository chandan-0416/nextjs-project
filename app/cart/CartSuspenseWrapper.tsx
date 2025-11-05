"use client";

import dynamic from "next/dynamic";

// ✅ Dynamic import allowed in Client Components
const CartPage = dynamic(() => import("./cartDetails"), {
  loading: () => <p className="text-center mt-10">Loading Cart...</p>,
  ssr: false,
});

export default function CartSuspenseWrapper() {
  return <CartPage />;
}
