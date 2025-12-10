// "use client";

// import { useCart } from "../context/CartContext";
// import { ShoppingCart, Menu, X } from "lucide-react";
// import Link from "next/link";
// import Image from "next/image";
// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import ThemeIconToggle from "./ThemeIconToggle";

// export default function Header() {
//   const { cartItems } = useCart();
//   const [isOpen, setIsOpen] = useState(false);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const router = useRouter();

//   // Check if user is logged in
//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     setIsLoggedIn(!!token);
//   }, []);

//   // Logout function
//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     setIsLoggedIn(false);
//     router.push("/login");
//   };

//   return (
  
//     <header className="fixed top-0 left-0 w-full z-50  bg-gradient-to-b from-blue-100 to-blue-200  border-b bg-white">
//       <div className="max-w-6xl mx-auto flex justify-between items-center">

//         {/* Logo */}
//         <Link href="/" className="hover:text-blue-600">
//           <div className="flex items-center gap-2">
//             <Image src="/images/icon1.png" alt="Logo" width={30} height={30} />
//             <h1 className="text-xl font-bold">TrendTide</h1>
//           </div>
//         </Link>

//         {/* Desktop Navbar */}
//         <nav className="hidden md:flex gap-6 items-center">

//           <Link href="/product" className="hover:text-blue-600">Products</Link>
//           <Link href="/about" className="hover:text-blue-600">About</Link>
//           <Link href="/features" className="hover:text-blue-600">Features</Link>
//           <Link href="/pricing" className="hover:text-blue-600">Pricing</Link>

//           {/* Cart */}
//           <Link href="/cart" className="relative inline-block">
//             <ShoppingCart size={24} />
//             <span className="absolute -top-3 -right-3 flex items-center justify-center
//               h-5 w-5 text-xs font-semibold bg-red-500 text-white rounded-full">
//               {cartItems.length}
//             </span>
//           </Link>
//           {/* Theme Toogle */}
//           <ThemeIconToggle />
    
//           {/* AUTH BUTTONS */}
//           {!isLoggedIn ? (
//             <>
//               <Link
//                 href="/login"
//                 className="px-4 py-2 bg-white border border-blue-600 rounded-lg text-blue-600 hover:bg-blue-600 hover:text-white transition"
//               >
//                 Login
//               </Link>

//               <Link
//                 href="/signup"
//                 className="px-4 py-2 bg-blue-600 rounded-lg text-white hover:bg-blue-700 transition"
//               >
//                 Signup
//               </Link>
//             </>
//           ) : (
//             <button
//               onClick={handleLogout}
//               className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
//             >
//               Logout
//             </button>
//           )}
//         </nav>

//         {/* Mobile Menu Button */}
//         <button
//           className="md:hidden p-2"
//           onClick={() => setIsOpen(!isOpen)}
//         >
//           {isOpen ? <X size={28} /> : <Menu size={28} />}
//         </button>
//       </div>

//       {/* Mobile Dropdown Menu */}
//       {isOpen && (
//         <div className="md:hidden bg-blue-50 border-t border-blue-200 shadow-inner">
//           <div className="flex flex-col p-4 space-y-4">

//             <Link href="/product" onClick={() => setIsOpen(false)} className="hover:text-blue-600">
//               Products
//             </Link>

//             <Link href="/about" onClick={() => setIsOpen(false)} className="hover:text-blue-600">
//               About
//             </Link>

//             <Link href="/features" onClick={() => setIsOpen(false)} className="hover:text-blue-600">
//               Features
//             </Link>

//             <Link href="/pricing" onClick={() => setIsOpen(false)} className="hover:text-blue-600">
//               Pricing
//             </Link>

//             {/* Cart */}
//             <Link
//               href="/cart"
//               onClick={() => setIsOpen(false)}
//               className="relative flex items-center gap-2"
//             >
//               <ShoppingCart size={22} />
//               <span className="text-md">Cart</span>

//               <span className="absolute -top-2 left-4 flex items-center justify-center
//                 h-5 w-5 text-xs font-semibold bg-red-500 text-white rounded-full">
//                 {cartItems.length}
//               </span>
//             </Link>

//             {/* AUTH (Mobile) */}
//             {!isLoggedIn ? (
//               <>
//                 <Link
//                   href="/login"
//                   onClick={() => setIsOpen(false)}
//                   className="px-4 py-2 bg-white border border-blue-600 rounded-lg text-blue-600 hover:bg-blue-600 hover:text-white transition"
//                 >
//                   Login
//                 </Link>

//                 <Link
//                   href="/signup"
//                   onClick={() => setIsOpen(false)}
//                   className="px-4 py-2 bg-blue-600 rounded-lg text-white hover:bg-blue-700 transition"
//                 >
//                   Signup
//                 </Link>
//               </>
//             ) : (
//               <button
//                 onClick={() => {
//                   handleLogout();
//                   setIsOpen(false);
//                 }}
//                 className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
//               >
//                 Logout
//               </button>
//             )}
//           </div>
//         </div>
//       )}
//     </header>
 
//   );
// }





// "use client";

// import { useCart } from "../context/CartContext";
// import { ShoppingCart, Menu, X } from "lucide-react";
// import Link from "next/link";
// import Image from "next/image";
// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import ThemeIconToggle from "./ThemeIconToggle";

// export default function Header() {
//   const { cartItems } = useCart();
//   const [isOpen, setIsOpen] = useState(false);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [mounted, setMounted] = useState(false); // ✅ mounted flag
//   const router = useRouter();

//   // Check if user is logged in
//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     setIsLoggedIn(!!token);
//     setMounted(true); // ✅ mark client mount
//   }, []);

//   // Logout function
//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     setIsLoggedIn(false);
//     router.push("/login");
//   };

//   if (!mounted) {
//     // ✅ Render fallback during SSR to prevent hydration mismatch
//     return (
//       <header className="fixed top-0 left-0 w-full z-50 bg-gradient-to-b from-blue-100 to-blue-200 border-b bg-white">
//         <div className="max-w-6xl mx-auto flex justify-between items-center p-4">
//           <Link href="/">Logo</Link>
//         </div>
//       </header>
//     );
//   }

//   // Full header after client mounted
//   return (
//     <header className="fixed top-0 left-0 w-full z-50 bg-gradient-to-b from-blue-100 to-blue-200 border-b bg-white dark:bg-gray-900">
//       <div className="max-w-6xl mx-auto flex justify-between items-center p-4">
//         {/* Logo */}
//         <Link href="/" className="hover:text-blue-600">
//           <div className="flex items-center gap-2">
//             <Image src="/images/icon1.png" alt="Logo" width={30} height={30} />
//             <h1 className="text-xl font-bold">TrendTide</h1>
//           </div>
//         </Link>

//         {/* Desktop Navbar */}
//         <nav className="hidden md:flex gap-6 items-center">
//           <Link href="/product" className="hover:text-blue-600">Products</Link>
//           <Link href="/about" className="hover:text-blue-600">About</Link>
//           <Link href="/features" className="hover:text-blue-600">Features</Link>
//           <Link href="/pricing" className="hover:text-blue-600">Pricing</Link>

//           {/* Cart */}
//           <Link href="/cart" className="relative inline-block">
//             <ShoppingCart size={24} />
//             <span className="absolute -top-3 -right-3 flex items-center justify-center
//               h-5 w-5 text-xs font-semibold bg-red-500 text-white rounded-full">
//               {cartItems.length}
//             </span>
//           </Link>

//           {/* Theme Toggle */}
//           <ThemeIconToggle />

//           {/* AUTH BUTTONS */}
//           {!isLoggedIn ? (
//             <>
//               <Link
//                 href="/login"
//                 className="px-4 py-2 bg-white border border-blue-600 rounded-lg text-blue-600 hover:bg-blue-600 hover:text-white transition"
//               >
//                 Login
//               </Link>

//               <Link
//                 href="/signup"
//                 className="px-4 py-2 bg-blue-600 rounded-lg text-white hover:bg-blue-700 transition"
//               >
//                 Signup
//               </Link>
//             </>
//           ) : (
//             <button
//               onClick={handleLogout}
//               className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
//             >
//               Logout
//             </button>
//           )}
//         </nav>

//         {/* Mobile Menu Button */}
//         <button
//           className="md:hidden p-2"
//           onClick={() => setIsOpen(!isOpen)}
//         >
//           {isOpen ? <X size={28} /> : <Menu size={28} />}
//         </button>
//       </div>

//       {/* Mobile Dropdown Menu */}
//       {isOpen && (
//         <div className="md:hidden bg-blue-50 border-t border-blue-200 shadow-inner">
//           <div className="flex flex-col p-4 space-y-4">
//             <Link href="/product" onClick={() => setIsOpen(false)} className="hover:text-blue-600">
//               Products
//             </Link>

//             <Link href="/about" onClick={() => setIsOpen(false)} className="hover:text-blue-600">
//               About
//             </Link>

//             <Link href="/features" onClick={() => setIsOpen(false)} className="hover:text-blue-600">
//               Features
//             </Link>

//             <Link href="/pricing" onClick={() => setIsOpen(false)} className="hover:text-blue-600">
//               Pricing
//             </Link>

//             {/* Cart */}
//             <Link
//               href="/cart"
//               onClick={() => setIsOpen(false)}
//               className="relative flex items-center gap-2"
//             >
//               <ShoppingCart size={22} />
//               <span className="text-md">Cart</span>
//               <span className="absolute -top-2 left-4 flex items-center justify-center
//                 h-5 w-5 text-xs font-semibold bg-red-500 text-white rounded-full">
//                 {cartItems.length}
//               </span>
//             </Link>

//             {/* AUTH (Mobile) */}
//             {!isLoggedIn ? (
//               <>
//                 <Link
//                   href="/login"
//                   onClick={() => setIsOpen(false)}
//                   className="px-4 py-2 bg-white border border-blue-600 rounded-lg text-blue-600 hover:bg-blue-600 hover:text-white transition"
//                 >
//                   Login
//                 </Link>

//                 <Link
//                   href="/signup"
//                   onClick={() => setIsOpen(false)}
//                   className="px-4 py-2 bg-blue-600 rounded-lg text-white hover:bg-blue-700 transition"
//                 >
//                   Signup
//                 </Link>
//               </>
//             ) : (
//               <button
//                 onClick={() => {
//                   handleLogout();
//                   setIsOpen(false);
//                 }}
//                 className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
//               >
//                 Logout
//               </button>
//             )}
//           </div>
//         </div>
//       )}
//     </header>
//   );
// }







"use client";

import { useCart } from "../context/CartContext";
import { ShoppingCart, Menu, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ThemeIconToggle from "./ThemeIconToggle";

export default function Header() {
  const { cartItems } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [mounted, setMounted] = useState(false); // ✅ mounted flag
  const router = useRouter();

  // Check if user is logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
    setMounted(true); // ✅ mark client mount
  }, []);

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    router.push("/login");
  };

  if (!mounted) {
    // ✅ Render fallback during SSR to prevent hydration mismatch
    return (
      <header className="fixed top-0 left-0 w-full z-50 bg-gradient-to-b from-blue-100 to-blue-200 border-b bg-white">
        <div className="max-w-6xl mx-auto flex justify-between items-center p-4">
          <Link href="/">Logo</Link>
        </div>
      </header>
    );
  }

  // Full header after client mounted
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-gradient-to-b from-blue-100 to-blue-200 border-b bg-white dark:bg-gray-900">
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
            <span className="absolute -top-3 -right-3 flex items-center justify-center
              h-5 w-5 text-xs font-semibold bg-red-500 text-white rounded-full">
              {cartItems.length}
            </span>
          </Link>

          {/* Theme Toggle */}
          {mounted && <ThemeIconToggle />} {/* ✅ Render only after client mount */}

          {/* AUTH BUTTONS */}
          {!isLoggedIn ? (
            <>
              <Link
                href="/login"
                className="px-4 py-2 bg-white border border-blue-600 rounded-lg text-blue-600 hover:bg-blue-600 hover:text-white transition"
              >
                Login
              </Link>

              <Link
                href="/signup"
                className="px-4 py-2 bg-blue-600 rounded-lg text-white hover:bg-blue-700 transition"
              >
                Signup
              </Link>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
            >
              Logout
            </button>
          )}
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
            <Link href="/product" onClick={() => setIsOpen(false)} className="hover:text-blue-600">
              Products
            </Link>

            <Link href="/about" onClick={() => setIsOpen(false)} className="hover:text-blue-600">
              About
            </Link>

            <Link href="/features" onClick={() => setIsOpen(false)} className="hover:text-blue-600">
              Features
            </Link>

            <Link href="/pricing" onClick={() => setIsOpen(false)} className="hover:text-blue-600">
              Pricing
            </Link>

            {/* Cart */}
            <Link
              href="/cart"
              onClick={() => setIsOpen(false)}
              className="relative flex items-center gap-2"
            >
              <ShoppingCart size={22} />
              <span className="text-md">Cart</span>
              <span className="absolute -top-2 left-4 flex items-center justify-center
                h-5 w-5 text-xs font-semibold bg-red-500 text-white rounded-full">
                {cartItems.length}
              </span>
            </Link>

            {/* AUTH (Mobile) */}
            {!isLoggedIn ? (
              <>
                <Link
                  href="/login"
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 bg-white border border-blue-600 rounded-lg text-blue-600 hover:bg-blue-600 hover:text-white transition"
                >
                  Login
                </Link>

                <Link
                  href="/signup"
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 bg-blue-600 rounded-lg text-white hover:bg-blue-700 transition"
                >
                  Signup
                </Link>
              </>
            ) : (
              <button
                onClick={() => {
                  handleLogout();
                  setIsOpen(false);
                }}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
