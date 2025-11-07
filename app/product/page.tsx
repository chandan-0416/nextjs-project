// import React from 'react'
// import ProductsPage from './listProduct'
// import SearchBar from './searchBar'

// export default function page() {
//   return (
//     <div>
//       <SearchBar />
//       <ProductsPage />
//     </div>
//   )
// }
// app/products/page.tsx



// import { Suspense } from "react";
// import ProductsGrid from "./listProduct";
// import ProductSkeleton from "./productSkeleton";

// // 🕒 Utility delay function
// const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

// async function fetchProducts() {
//   // 🧠 Simulate slow network (skeleton visible for ~2 seconds)
//   await delay(2000);

//   // 🌐 Server-side data fetching with ISR (revalidate every 60s)
//   const res = await fetch("https://dummyjson.com/products?limit=100", {
//     next: { revalidate: 60 },
//   });

//   if (!res.ok) {
//     throw new Error("Failed to fetch products");
//   }

//   const data = await res.json();
//   return data.products;
// }

// export default async function ProductsPage() {
//   const productsPromise = fetchProducts();

//   return (
//     <div className="mt-28 flex flex-col md:flex-row px-6 gap-6 mb-10">
//       {/* 🧩 Suspense Boundary */}
//       <Suspense fallback={<ProductSkeleton />}>
//         {/* ✅ Data is streamed once resolved */}
//         <ProductsGrid products={await productsPromise} />
//       </Suspense>
//     </div>
//   );
// }




// app/products/page.tsx
import { Suspense } from "react";
import ProductsGrid from "./listProduct";
import ProductSkeleton from "./productSkeleton";

// Small delay to simulate network
const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

async function fetchProducts() {
  await delay(2000); // just for suspense demo

  // ✅ Fetch from internal API route
  const res = await fetch("http://localhost:3000/api/products", {   // server page - page.tsx => add base url of local host as becz we are not deploy
    next: { revalidate: 60 }, // ISR caching
  });

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  const products = await res.json();
  return products;
}

export default async function ProductsPage() {
  const productsPromise = fetchProducts();

  return (
    <div className="mt-28 flex flex-col md:flex-row px-6 gap-6 mb-10">
      {/* ✅ Suspense: show skeleton until data loads */}
      <Suspense fallback={<ProductSkeleton />}>
        <ProductsGrid products={await productsPromise} />
      </Suspense>
    </div>
  );
}

