import { Suspense } from "react";
import ProductsGrid from "./listProduct";
import ProductSkeleton from "./productSkeleton";



// Small delay to simulate network
const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));


async function fetchProducts() {
  await delay(2000); // just for suspense demo

  // ✅ Fetch from internal API route
  const res = await fetch("http://localhost:3000/api/products", {   // server page - page.tsx => add base url of local host as becz we are not deploy
    next: { revalidate: 60 }, // ISR caching | ISR (Incremental Static Regeneration) to revalidate cached data every 60 seconds
  });

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  const products = await res.json();
  return products;
}

export default async function ProductsPage() {
  const productsPromise = await fetchProducts();

  return (
    <div className="mt-28 flex flex-col md:flex-row px-6 gap-6 mb-10">
      {/* ✅ Suspense: show skeleton until data loads */}
      <Suspense fallback={<ProductSkeleton />}>
        <ProductsGrid products={productsPromise} /> 
      </Suspense>
    </div>
  );
}



{/*** await , await delay, what happen when we add items carts, scrumbread
- async is a keyword used before a function. It tells JavaScript: “This function will return a Promise.”
- Even though we returned a string, JavaScript wraps it in a Promise automatically.
- await is used inside an async function to pause the execution until a Promise is resolved.

***/

} 



