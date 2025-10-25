import { Suspense } from "react";
import FiltertheProduct from "./filterProduct";
import Image from "next/image";
import Link from "next/link";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import DetailPage from "../detailPage/[id]/page";

export type Product = {
  id: number;
  title: string;
  availabilityStatus: string;
  description: string;
  category: string;
  brand: string;
  thumbnail: string;
  price: number;
  rating: number;
  returnPolicy: string;
  stock: number;
};

// 🧠 Server-side data fetch (runs on server)
async function fetchProducts(): Promise<Product[]> {
  const res = await fetch("https://dummyjson.com/products?limit=100", {
    cache: "no-store", // disable caching to always fetch fresh data
  });
  const data = await res.json();
  return data.products;
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const products = await fetchProducts();

  // 🧩 Extract filters from URL query
  const search = (searchParams.search as string) || "";
  const category = (searchParams.category as string) || "All";
  const ratings = Array.isArray(searchParams.rating)
    ? searchParams.rating.map((r) => Number(r))
    : searchParams.rating
    ? [Number(searchParams.rating)]
    : [];
  const tags = Array.isArray(searchParams.tags)
    ? (searchParams.tags as string[])
    : searchParams.tags
    ? [searchParams.tags as string]
    : [];
  const price = Number(searchParams.price || 2000);

  // 🧠 Server-side filtering
  const filteredProducts = products.filter((p) => {
    const matchTitle = p.title.toLowerCase().includes(search.toLowerCase());
    const matchCategory = category === "All" || p.category === category;
    const matchRating =
      ratings.length === 0 || ratings.includes(Math.round(p.rating));
    const matchPrice = p.price <= price;
    const matchTags =
      tags.length === 0 ||
      tags.some((t) => t === p.brand || t === p.category);
    return matchTitle && matchCategory && matchRating && matchPrice && matchTags;
  });

  return (
    <div className="flex flex-col md:flex-row mt-10 px-6 gap-6 mb-10">

      {/* 🧰 Filter Sidebar (Client Component) */}
      <aside className="w-full md:w-1/4 lg:w-1/5">
         <Suspense fallback={<p>Loading the filter Sidebar...</p>}>
        <FiltertheProduct
          products={products}
          search={search}
          category={category}
          ratings={ratings}
          tags={tags}
          price={price}
        />
       </Suspense>
      </aside>

      {/* 🛍️ Products Grid */}  
      <main className="flex-1">
       <Link  href="../detailPage/[id]/page">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              
              <div
                key={product.id}
                className="border rounded-lg p-4 shadow hover:shadow-md transition"
              >
              <Image 
                  src={product.thumbnail}
                  alt={product.title}
                  width={400}      
                  height={300}
                  className="w-full h-48 object-cover rounded-md mb-3"
                   unoptimized  
                />
                <h2 className="text-lg font-semibold text-gray-900">
                  {product.title}
                </h2>
                <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                  {product.description}
                </p>
                <p className="text-indigo-600 font-semibold mt-2">
                  ${product.price}
                </p>
                <p className="text-yellow-500">⭐ {product.rating}</p>
                <p className="text-sm text-gray-400">{product.category}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-600 text-center mt-10">
              No products match your filters.
            </p>
          )}
        </div>
         </Link>
      </main>
    </div>
  );
}