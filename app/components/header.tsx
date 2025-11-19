"use client";

import { useCart } from "../context/CartContext";
import { ShoppingCart, Menu, X } from "lucide-react"; 
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function Header() {
  const { cartItems } = useCart();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-gradient-to-b from-blue-100 to-blue-200 shadow-md">
      <div className="max-w-6xl mx-auto flex justify-between items-center p-4">

        {/* Logo */}
        <Link href="/" className="hover:text-blue-600">
          <div className="flex items-center gap-2">
            <Image src="/images/icon1.png" alt="Logo" width={30} height={30} />
            <h1 className="text-xl font-bold">TrendTide</h1>
          </div>
        </Link>

        {/* Desktop Navbar */}
        <nav className="hidden md:flex gap-6 items-center">
          <Link href="/product" className="hover:text-blue-600">Products</Link>
          <Link href="/about" className="hover:text-blue-600">About</Link>
          <Link href="/features" className="hover:text-blue-600">Features</Link>
          <Link href="/pricing" className="hover:text-blue-600">Pricing</Link>

          {/* Cart */}
          <Link href="/cart" className="relative inline-block">
            <ShoppingCart size={24} />
            {cartItems.length >= 0 && (
              <span className="absolute -top-4 -right-4 flex items-center justify-center
                h-5 w-5 text-xs font-semibold bg-red-500 text-white rounded-full">
                {cartItems.length}
              </span>
            )}
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden bg-blue-50 border-t border-blue-200 shadow-inner">
          <div className="flex flex-col p-4 space-y-4">

            <Link href="/product" className="hover:text-blue-600" onClick={() => setIsOpen(false)}>
              Products
            </Link>
            <Link href="/about" className="hover:text-blue-600" onClick={() => setIsOpen(false)}>
              About
            </Link>
            <Link href="/features" className="hover:text-blue-600" onClick={() => setIsOpen(false)}>
              Features
            </Link>
            <Link href="/pricing" className="hover:text-blue-600" onClick={() => setIsOpen(false)}>
              Pricing
            </Link>

            {/* Cart on Mobile */}
            <Link href="/cart" className="relative flex items-center gap-2" onClick={() => setIsOpen(false)}>
              <ShoppingCart size={22} />
              <span className="text-md">Cart</span>

              <span className="absolute -top-2 left-4 flex items-center justify-center
                h-5 w-5 text-xs font-semibold bg-red-500 text-white rounded-full">
                {cartItems.length}
              </span>
            </Link>

          </div>
        </div>
      )}
    </header>
  );
}
