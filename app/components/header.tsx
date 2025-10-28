"use client";

import { useCart } from "../context/CartContext";
import { ShoppingCart, Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";

export default function Header() {
  const { cartItems } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-gradient-to-b from-blue-100 to-blue-200 shadow-md">
      <div className="max-w-6xl mx-auto flex justify-between items-center p-4">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Image src="/images/icon1.png" alt="Logo" width={30} height={30} />
          <h1 className="text-xl font-bold">TrendTide</h1>
        </div>

        {/* Nav for desktop */}
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
          <Link href="/cart" className="relative">
            <ShoppingCart size={24} />
            {cartItems.length > 0 && (
              <span className="absolute right-0 top-1.5 ml-1 bg-red-500 text-white text-2xl rounded-full px-2">
                {cartItems.length}
              </span>
            )}
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </header>
  );
}