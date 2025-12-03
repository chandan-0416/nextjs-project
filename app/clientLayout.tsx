// "use client";

// import { usePathname } from "next/navigation";
// import Header from "./components/header";
// import Footer from "./components/footer";
// import { CartProvider } from "./context/CartContext";

// export default function ClientLayout({ children }: { children: React.ReactNode }) {
//   const pathname = usePathname();

//   const hideLayout = pathname === "/login" || pathname === "/signup";

//   return (
//     <>
//        <CartProvider>
//       {!hideLayout && <Header />}
//       {children}
//       {!hideLayout && <Footer />}
//       </CartProvider>
//     </>
//   );
// }
