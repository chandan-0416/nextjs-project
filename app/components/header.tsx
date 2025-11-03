"use client";

import { useCart } from "../context/CartContext"; // React.context
import { ShoppingCart} from "lucide-react";  //shopping cart icon
import Link from "next/link"; // Navigation b/w pages - LINK component
import Image from "next/image"; // 

export default function Header() {
  const { cartItems } = useCart();
  return (
    <header className=" fixed top-0 left-0 w-full z-50 bg-gradient-to-b from-blue-100 to-blue-200 shadow-md ">
      <div className="max-w-6xl mx-auto flex justify-between items-center p-4">

        {/* Logo */}
         <Link href="/" className="hover:text-blue-600">
        <div className="flex items-center gap-2">
          <Image src="/images/icon1.png" alt="Logo" width={30} height={30} />
          <h1 className="text-xl font-bold">TrendTide</h1>
        </div>
        </Link>

        {/* Navbar */}
        <nav className="hidden md:flex gap-6 items-center">
          <Link href="/product" className="hover:text-blue-600">
            Products
          </Link>
          <Link href="/about" className="hover:text-blue-600">
            About
          </Link>
          <Link href="/features" className="hover:text-blue-600">
            Features
          </Link>
          <Link href="/pricing" className="hover:text-blue-600">
            Pricing
          </Link>

          {/* 🛒 Cart with Count */}
          <Link href="/cart" className="relative inline-block">
            <ShoppingCart size={24} />
            {cartItems.length >= 0 && (
              <span className="absolute -top-4 -right-4 flex items-center justify-center
                 h-5 w-5 text-xs font-semibold bg-red-500 text-white
                 rounded-full">
                {cartItems.length}
              </span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
}